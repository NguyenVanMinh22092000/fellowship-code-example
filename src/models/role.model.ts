import { model, property } from '@loopback/repository';
import { ModificationModel } from './mongo';
import { SearchBody } from './common.model';

@model()
export class SysFunction {
    @property({
        type: 'string',
        required: false,
    })
    name: string;

    @property({
        type: 'boolean',
        required: false,
    })
    enabled?: boolean;

    @property({
        type: 'array',
        itemType: 'any',
    })
    urls: string[];

    @property({
        type: 'string',
        required: false,
    })
    description: string;

    @property({
        type: 'string',
        required: false,
    })
    value: string;
}

@model()
export class SysModule {
    @property({
        type: 'string',
        required: false,
    })
    name: string;

    @property({
        type: 'boolean',
        required: false,
    })
    enabled?: boolean;

    @property({
        type: 'string',
        required: false,
    })
    functions: SysFunction[];
}

@model()
export class RoleSearch extends SearchBody {
    @property({
        type: 'string',
    })
    keyword?: string;
}

@model()
export class RoleSearchAll {
    @property({
        type: 'string',
        required: false,
    })
    keyword?: string;
    // This allow TypeScript to accept other properties that are not explicitly defined above
    [prop: string]: any;
}

@model()
export class Role extends ModificationModel {
    @property({
        type: 'string',
        required: false,
    })
    code?: string;

    @property({
        type: 'string',
        required: false,
    })
    name: string;

    @property({
        type: 'string',
        required: false,
    })
    desc?: string;

    @property({
        type: 'string',
        required: false,
    })
    version: string;

    @property({
        type: 'boolean',
        required: false,
    })
    hasModule?: boolean;

    @property({
        type: 'array',
        itemType: 'any',
    })
    modules: SysModule[];
}

@model()
export class RoleCreate extends Role {}

@model()
export class RoleUpdate extends Role {}
