import { Binding, inject, injectable, Next, Provider } from '@loopback/core';
import { asMiddleware, Middleware, MiddlewareContext, LogError, RestBindings, HttpErrors } from '@loopback/rest';

import { AppRespCodes } from '../constants';
import { ADMIN_ROLE_FUNCTION_MAP, AGENT_ROLE_FUNCTION_MAP, SELLER_ROLE_FUNCTION_MAP } from '../constants/roles';

import { verifyApiAuthentication } from '../utils';

import { Role } from '../models';
import { MgRole } from '../models/mongo';

import { USER_TYPE } from '../enums';

const allowedPaths: string[] = [
    '/',
    '/explorer',
    '/explorer/',
    '/explorer/swagger-ui.css',
    '/explorer/swagger-ui-bundle.js',
    '/explorer/swagger-ui-standalone-preset.js',
    '/explorer/openapi.json',
    '/explorer/favicon-32x32.png',
    '/admin/user/login',
    '/user/login',
    '/order/track',
    '/order/webhook-processor',
    '/user/register',
];

// Extend the Request type to include the users attribute
declare module 'express' {
    interface Request {
        users?: any;
    }
}

@injectable(
    asMiddleware({
        group: 'authentication',
    }),
)
export class Router implements Provider<Middleware> {
    constructor(
        @inject(RestBindings.SequenceActions.LOG_ERROR)
        protected logError: LogError,
    ) {}

    async value() {
        const middleware: Middleware = async (ctx: MiddlewareContext, next: Next) => {
            try {
                let context = ctx as any;
                let registry = context.registry?.get('rest.operation.route') as Binding;
                let path = registry.source?.value.path;
                if (allowedPaths.includes(ctx.request.url.split('?')[0])) {
                    return await next();
                }
                let curl = ctx.request.method + '|' + path;
                /*
                 * verification account
                 */
                let verified: any = await verifyApiAuthentication(ctx.request, ctx.response, false);
                ctx.request.users = await verified.verifiedUser;
                ctx.request.users = await this.setAccountType(ctx.request.users);
                ctx.request.users = await this.setRoleName(ctx.request.users);
                /*
                 * permission
                 */
                let user = ctx.request.users;
                if (user.roleId) {
                    const roleEntry: Role | any = await MgRole.findById(user.roleId);
                    if (!roleEntry) {
                        throw ctx.response.status(403).send(AppRespCodes.FORBIDDEN);
                    }
                    if (roleEntry.name) {
                        user.roleName = roleEntry.name;
                    }

                    let ROLE_FUNCTION_MAP = await this.getRoleMapByType(user);

                    if (ROLE_FUNCTION_MAP.get('role.default')?.includes(curl)) {
                        return await next();
                    }
                    if (roleEntry.modules) {
                        for (const module of roleEntry.modules) {
                            if (module.enabled && module.functions) {
                                for (const functionz of module.functions) {
                                    if (functionz.enabled) {
                                        let key = module.name + '.' + functionz.name;
                                        let urls = ROLE_FUNCTION_MAP.get(key);
                                        if (urls && urls.includes(curl)) {
                                            return await next();
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                throw ctx.response.status(403).send(AppRespCodes.FORBIDDEN);
            } catch (err) {
                // Any error handling goes here
                return this.handleError(ctx, err);
            }
        };
        return middleware;
    }

    handleError(context: MiddlewareContext, err: HttpErrors.HttpError): Response {
        // We simply log the error although more complex scenarios can be performed
        // such as customizing errors for a specific endpoint
        this.logError(err, err.statusCode, context.request);
        throw err;
    }

    async getRoleMapByType(user: any) {
        switch (user.type) {
            case USER_TYPE.ADMIN:
                return ADMIN_ROLE_FUNCTION_MAP;
            case USER_TYPE.AGENT:
                return AGENT_ROLE_FUNCTION_MAP;
            case USER_TYPE.SELLER:
                return SELLER_ROLE_FUNCTION_MAP;
        }
        return new Map<string, string[]>();
    }

    async setRoleName(user: any) {
        if (user.roleId) {
            const roleEntry: any = await MgRole.findById(user.roleId);
            if (roleEntry.name) {
                user.roleName = roleEntry.name;
            }
        }
        return user;
    }

    async setAccountType(user: any) {
        let { agentOrgId, sellerOrgId } = user;
        if (agentOrgId && sellerOrgId) {
            user.type = USER_TYPE.SELLER;
            user.modify = { sellerOrgId: user.sellerOrgId, agentOrgId: user.agentOrgId };
            return user;
        }
        if (agentOrgId) {
            user.type = USER_TYPE.AGENT;
            user.modify = { agentOrgId: user.agentOrgId };
            return user;
        }
        user.type = USER_TYPE.ADMIN;
        return user;
    }
}
