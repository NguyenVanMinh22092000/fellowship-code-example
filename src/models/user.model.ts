import { Model, model, property } from '@loopback/repository';

import { USER_STATUS, USER_TYPE } from '../enums';
import { ModificationOrgModel } from './mongo';
import { SearchBody } from './common.model';

@model()
export class User extends ModificationOrgModel {
    @property({
        type: 'string',
        id: true,
        required: true,
    })
    _id: string;

    @property({
        type: 'string',
        required: true,
    })
    userId: string;

    @property({
        type: 'string',
        required: false,
    })
    code: string;

    @property({
        type: 'string',
        required: false,
    })
    roleId: string;

    @property({
        type: 'string',
        required: false,
    })
    roleName?: string;

    @property({
        type: 'string',
        required: true,
    })
    fullName: string;

    @property({
        type: 'string',
        required: true,
    })
    fullNameKeyword: string;

    @property({
        type: 'string',
        required: false,
    })
    email: string;

    @property({
        type: 'string',
        required: false,
    })
    note: string;

    @property({
        type: 'string',
        required: false,
    })
    phoneNumber: string;

    @property({
        type: 'string',
        hidden: true,
    })
    password?: string;

    @property({
        type: 'string',
        required: false,
    })
    avatar?: string;

    @property({
        type: 'string',
        required: false,
    })
    address?: string;

    @property({
        type: 'string',
        required: true,
        default: USER_STATUS.INACTIVE,
    })
    status: string | string[];

    @property({
        type: 'string',
        default: USER_TYPE.NORMAL,
    })
    type: string;

    [prop: string]: any;
}

@model()
export class UserCreateBody extends ModificationOrgModel {
    @property({
        type: 'string',
        required: false,
        // jsonSchema: {
        //     format: 'email',
        //     minLength: 5,
        //     maxLength: 256,
        //     transform: ['toLowerCase'],
        // },
    })
    email: string;

    @property({
        type: 'string',
        required: true,
    })
    userId: string;

    @property({
        type: 'string',
        required: false,
    })
    roleId: string;

    @property({
        type: 'string',
        required: true,
        jsonSchema: {
            minLength: 1,
            maxLength: 256,
        },
    })
    password: string;

    @property({
        type: 'string',
        required: false,
    })
    avatar?: string;

    @property({
        type: 'string',
        required: false,
    })
    address?: string;

    @property({
        type: 'string',
        required: true,
        jsonSchema: {
            minLength: 1,
            maxLength: 256,
        },
    })
    fullName: string;

    @property({
        type: 'string',
        required: false,
        // jsonSchema: {
        //     minLength: 10,
        //     maxLength: 32,
        // },
    })
    phoneNumber: string;

    @property({
        type: 'string',
        required: false,
    })
    note: string;

    [prop: string]: any;
}

@model()
export class UserUpdateBody extends ModificationOrgModel {
    @property({
        type: 'string',
        required: false,
        // jsonSchema: {
        //     format: 'email',
        //     minLength: 5,
        //     maxLength: 256,
        //     transform: ['toLowerCase'],
        // },
    })
    email?: string;

    @property({
        type: 'string',
        required: false,
    })
    userId?: string;

    @property({
        type: 'string',
        required: false,
    })
    roleId?: string;

    @property({
        type: 'string',
        required: false,
        jsonSchema: {
            minLength: 1,
            maxLength: 256,
        },
    })
    password?: string;

    @property({
        type: 'string',
        required: false,
    })
    avatar?: string;

    @property({
        type: 'string',
        required: false,
    })
    address?: string;

    @property({
        type: 'string',
        required: true,
        jsonSchema: {
            minLength: 1,
            maxLength: 256,
        },
    })
    fullName?: string;

    @property({
        type: 'string',
        required: false,
        // jsonSchema: {
        //     minLength: 10,
        //     maxLength: 32,
        // },
    })
    phoneNumber?: string;

    @property({
        type: 'string',
        required: false,
    })
    note?: string;

    [prop: string]: any;
}

@model()
export class UserLoginBody extends Model {
    @property({
        type: 'string',
        required: true,
    })
    username: string;

    @property({
        type: 'string',
        required: true,
    })
    password: string;
}

@model()
export class UserAccessToken extends Model {
    @property({ type: 'string' })
    _id: string;

    @property({ type: 'string' })
    email: string;

    @property({ type: 'number' })
    exp: number;

    @property({ type: 'number' })
    iat: number;
}

export class UserBodySearch extends SearchBody {
    @property({
        type: 'array',
        itemType: 'any',
    })
    type?: string[];
}

@model()
export class UserLoginResp extends Model {
    @property({
        type: 'string',
    })
    accessToken: string;

    @property({
        type: 'object',
    })
    user: User;
}
