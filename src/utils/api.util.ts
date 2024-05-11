import { Request, RequestBody, Response, getModelSchemaRef } from '@loopback/rest';
import axios, { AxiosRequestConfig } from 'axios';
import { stringify as flattedStringify } from 'flatted';
import { ServerResponse } from 'http';

import { isObject, isString } from './common.util';
import { getDateOffset, getFormatDate } from './date.util';
import { verifyJWT } from './encrypt.util';
import { getMgObjectId, getMgSelect } from './mongo.util';
import { getLogColorful } from './string.util';

import { AppRespCodes, modelCommonExclude } from '../constants';
import { USER_STATUS, USER_TYPE } from '../enums';

import multer from 'multer';
import { PaginationModel, RespModal, User, UserAccessToken } from '../models';
import { mgUser } from '../models/mongo';
const storage = multer.memoryStorage();
const upload = multer({ storage });
interface GetApiRespDescOptions {
    model?: any;
    pagination?: boolean;
    exclude?: string[];
}

export const getApiBodyDesc = (model: any, title: string = '') => ({
    required: true,
    description: title,
    content: {
        'application/json': {
            schema: model ? getModelSchemaRef(model, { title }) : {},
        },
    },
});

export const getApiRespDesc = (description: string, options: GetApiRespDescOptions = {}) => {
    let schemaExclude = [...modelCommonExclude];
    if (options.exclude) schemaExclude.push(...options.exclude);
    let respType;
    let respSchema;

    if (options.pagination) {
        respType = 'pagination';
        respSchema = {
            items: {
                type: 'array',
                items: {
                    'x-ts-type': options.model,
                },
            },
            page: { type: 'number' },
            pageSize: { type: 'number' },
            hasNext: { type: 'boolean' },
            hasPrev: { type: 'boolean' },
            nextPage: { type: 'number' },
            prevPage: { type: 'number' },
            totalItem: { type: 'number' },
            totalPage: { type: 'number' },
        };
    } else {
        respType = 'payload';
        if (options.model) {
            let schemaRef = getModelSchemaRef(options.model, { exclude: schemaExclude });
            respSchema = Object.values(schemaRef.definitions)[0].properties;
        }
    }
    let schemaProperties = {
        error: { type: 'object', default: null },
        [respType]: { type: 'object', properties: respSchema },
    };
    return {
        security: [{ jwt: [] }],
        responses: {
            '200': {
                description,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: schemaProperties,
                        },
                    },
                },
            },
        },
    };
};

export const throwApiError = (code: any, msg?: any, data?: any) => {
    let error: any = { code };
    if (isString(msg)) error['message'] = msg.trim();
    if (isObject(msg)) Object.assign(error, msg);
    if (isObject(data)) Object.assign(error, data);
    return error;
};

export const verifyApiAuthentication = async (req: Request, res: Response, isAdminAPI?: boolean) => {
    const authorization = String(req.headers.authorization ?? '').trim();
    const [scheme, token] = authorization.split(' ');
    if (!authorization || scheme !== 'Bearer' || !token) {
        throw res.status(401).send(AppRespCodes.UNAUTHORIZED);
    }

    let verifiedToken = verifyJWT(token) as UserAccessToken | null;
    if (!verifiedToken || verifiedToken.exp * 1000 < +new Date()) {
        throw res.status(401).send(AppRespCodes.UNAUTHORIZED);
    }
    let verifiedUser = (await mgUser
        .findOne({
            _id: getMgObjectId(verifiedToken._id),
            isDeleted: { $ne: true },
            status: { $eq: USER_STATUS.ACTIVE },
        })
        .select(getMgSelect())
        .lean()
        .exec()) as User | null;
    if (!verifiedUser) {
        throw res.status(401).send(AppRespCodes.UNAUTHORIZED);
    }
    if (isAdminAPI && verifiedUser.type !== USER_TYPE.ADMIN) {
        throw res.status(403).send(AppRespCodes.FORBIDDEN);
    }
    return { verifiedToken, verifiedUser };
};

export const getApiError = (e?: any, req?: Request): RespModal => {
    let error: any = {};
    if (e instanceof Error) {
        error.code = (e as any).code;
        error.stack = e.stack;
        error.message = e.message;
    } else {
        error = e;
    }
    if (req) apiErrorLogger(req, error);
    return {
        statusCode: AppRespCodes.FAILURE,
        error,
    };
};

export const getApiPayload = (payload: any): RespModal => {
    return {
        statusCode: AppRespCodes.SUCCESS,
        payload,
    };
};

export const getAppRespCodesPayload = (payload: any): RespModal => {
    return {
        statusCode: !!payload ? AppRespCodes.SUCCESS : AppRespCodes.FAILURE,
        payload,
    };
};

export const getApiPagination = (items: any[], page: number, pageSize: number, totalItem: number, extraData?: any) => {
    if (pageSize > 50) pageSize = 50;
    const totalPage =
        (totalItem / pageSize).toString().indexOf('.') > -1 ? ~~(totalItem / pageSize) + 1 : totalItem / pageSize;
    const hasNext = totalPage > page;
    const hasPrev = page > 1;
    return {
        statusCode: AppRespCodes.SUCCESS,
        pagination: {
            items,
            page,
            pageSize,
            hasNext,
            hasPrev,
            nextPage: hasNext ? page + 1 : null,
            prevPage: hasPrev ? page - 1 : null,
            totalPage,
            totalItem,
        },
        ...extraData,
    };
};

export const getRespPagination = (page: number, size: number, total: number): PaginationModel => {
    const totalPage: number = parseInt(Number(total / size).toString()) + (total % size ? 1 : 0);
    return {
        hasNext: page < totalPage,
        hasPrev: page > 1,
        page: page,
        pageSize: size,
        nextPage: page === totalPage ? page : page + 1,
        prevPage: page === 1 ? 1 : page - 1,
        totalItems: total,
        totalPages: totalPage,
    };
};

export const axiosRequest = async (
    method: string,
    url: string,
    data?: any,
    headers?: object | null,
    options?: object | null,
    debug: boolean = false,
): Promise<any> => {
    try {
        let option: AxiosRequestConfig = {
            method,
            url,
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            },
            data: JSON.stringify(data),
        };
        if (debug) console.log(`🚀 Kds: axiosRequest -> option:`, option);
        return await axios.request(option);
    } catch (error) {
        return { error };
    }
};

export const apiErrorLogger = (req: Request, error?: any, msgPrefix?: string) => {
    const { headers, hostname, ip, method, path } = req;
    let userAgent = headers['user-agent'] ?? '';
    let logMsg =
        [
            getLogColorful('ERROR', 'red'),
            getLogColorful(getFormatDate('dd-MM-yyyy HH:mm:ss:ms', getDateOffset(7)), 'yellow'),
            getLogColorful(hostname, 'green'),
            getLogColorful(ip!, 'magenta'),
            getLogColorful(userAgent.split(/[()]/)?.[1] ?? userAgent, 'blue'),
            getLogColorful(method, 'yellow'),
            getLogColorful(path, 'yellow'),
        ]
            .map((i) => `[${i}]`)
            .join('') + ' ';
    if (isObject(error)) {
        if (error instanceof ServerResponse) {
            error = {
                statusCode: error.statusCode,
                statusMessage: error.statusMessage,
            };
        }
        const { statusCode, code, statusMessage, message, stack, detail } = error;
        let errorLogs = [code ?? statusCode, (msgPrefix ? `${msgPrefix} ` : '') + (message ?? statusMessage)];
        if ([AppRespCodes.UNAUTHORIZED, AppRespCodes.FORBIDDEN].includes(errorLogs[1])) {
            return;
        }
        if (detail?.name === 'AxiosError') {
            delete detail.stack;
            delete detail.config;
        }
        if (stack) {
            errorLogs.splice(1, 1, stack);
        }
        let errorText = errorLogs.filter((i) => i).join(' | ');
        if (!errorText) {
            try {
                errorText = flattedStringify(error);
            } catch (e) {
                console.log(`🚀 Kds: apiErrorLogger -> stringify error:`, e);
            }
        }
        logMsg += errorText;
    } else {
        logMsg += error;
    }
    console.log(logMsg);
};

export const getReqDuration = (reqAt: number) => {
    return +new Date() - reqAt;
};

export async function getUploadedFiles(request: Request): Promise<RequestBody> {
    return new Promise<RequestBody>((resolve, reject) => {
        upload.any()(request, {} as any, (err: unknown) => {
            if (err) {
                reject(err);
            } else {
                resolve({
                    value: {
                        files: request.files,
                        fields: request.body,
                    },
                });
            }
        });
    });
}
