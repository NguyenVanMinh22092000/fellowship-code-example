import { Model, model, property } from '@loopback/repository';

import { lbModelRequiredParams } from './common.model';

@model()
export class AdminUserGetBody extends Model {
    @property({
        type: 'string',
        required: true,
        jsonSchema: {
            minLength: 1,
        },
    })
    userId: string;
}

@model()
export class AdminUserResetPwdBody extends Model {
    @property({
        type: 'string',
        required: false,
        jsonSchema: {
            minLength: 1,
        },
    })
    userName?: string;

    @property(lbModelRequiredParams)
    password: string;
}

@model()
export class AdminUserUpdateBody extends Model {
    @property({
        type: 'string',
        required: true,
    })
    _id: string;

    @property({
        type: 'string',
        required: true,
        jsonSchema: {
            minLength: 1,
        },
    })
    userId: string;

    @property({
        type: 'string',
        required: true,
        jsonSchema: {
            minLength: 1,
        },
    })
    fullName: string;

    @property({
        type: 'string',
        required: true,
        jsonSchema: {
            minLength: 1,
        },
    })
    status: string;
}
