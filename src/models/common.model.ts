import { Model, model, property } from '@loopback/repository';

export const lbModelRequiredParams = {
    type: 'string',
    required: true,
    jsonSchema: {
        minLength: 1,
    },
};

export const HEADER = {
    'Content-Type': 'application/json',
};

export type SearchDate = {
    from?: number;
    to?: number;
};

export type PaginationModel = {
    page?: number;
    pageSize?: number;
    hasPrev?: boolean;
    hasNext?: boolean;
    nextPage?: number;
    prevPage?: number;
    totalPages?: number;
    totalItems?: number;
};

export type RespModal = {
    statusCode: number;
    payload?: any;
    message?: string | null;
    error?: any;
    [key: string]: any;
};

export type CommonInfo = {
    id?: string;
    _id?: string;

    createdDate?: number;
    createdBy?: string;
    updatedDate?: number;
    updatedBy?: string;
};

export type PaginationResp<T> = {
    items?: T[];
} & PaginationModel;

@model()
export class SearchBody extends Model {
    @property({
        type: 'number',
        required: true,
        jsonSchema: {
            minimum: 1,
        },
    })
    page: number;

    @property({
        type: 'number',
        required: true,
        jsonSchema: {
            minimum: 1,
            maximum: 1000,
        },
    })
    size: number;

    @property({
        type: 'object',
    })
    createdDate?: SearchDate;

    @property({
        type: 'string',
    })
    keyword?: string;

    @property({
        type: 'array',
        itemType: 'any',
    })
    agentOrgIds?: string[];

    @property({
        type: 'array',
        itemType: 'any',
    })
    sellerOrgIds?: string[];

    // This allow TypeScript to accept other properties that are not explicitly defined above
    [prop: string]: any;
}

@model()
export class DeleteMany extends Model {
    @property({
        type: 'array',
        itemType: 'any',
        default: [],
    })
    ids?: string[];
    @property({
        type: 'array',
        itemType: 'any',
        default: [],
    })
    excludeIds?: string[];
    @property({
        type: 'boolean',
        default: [],
    })
    isSelectAll?: boolean;
    @property({
        type: 'object',
        required: false,
    })
    filter?: Filter;
}

export interface Filter {
    activeStatus?: string[];
    keyword?: string;
}

export type Processing = {
    status: string;
    error?: any;
    requestId?: string;
    fileName?: string;
    successfulTotal?: number;
};

export type JobData = {
    sessionId: string;
    service: string;
    type: string;
    data: any;
};

export type SessionData = {
    status: string;
    data: any;
};
