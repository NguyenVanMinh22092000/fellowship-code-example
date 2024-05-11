import { model, property } from '@loopback/repository';
import { Model, ObjectId } from 'mongoose';
import { TRANSPORT_TYPE } from '../enums';
import { SearchDate } from './common.model';

@model()
export class TransportCode extends Model {
    @property({
        type: 'object',
    })
    _id?: ObjectId;

    @property({
        type: 'boolean',
        default: false,
    })
    isDeleted?: boolean;

    @property({
        type: 'number',
    })
    createdDate?: number;

    @property({
        type: 'string',
    })
    createdBy?: string;

    @property({
        type: 'number',
        default: +new Date(),
    })
    updatedDate?: number;

    @property({
        type: 'string',
    })
    updatedBy?: string;

    @property({
        type: 'string',
    })
    countryCode: string;

    @property({
        type: 'string',
    })
    transportCode: string;

    @property({
        type: 'string',
    })
    name: string;

    @property({
        type: 'string',
    })
    location: string;

    @property({
        type: 'string',
    })
    activeStatus: string;

    @property({
        type: 'string',
        required: true,
        jsonSchema: {
            enum: Object.values(TRANSPORT_TYPE),
        },
    })
    transportType: string;
}

@model()
export class TransportCodeSearch extends Model {
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
            maximum: 50,
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

    // This allow TypeScript to accept other properties that are not explicitly defined above
    [prop: string]: any;

    @property({
        type: 'string',
        required: false,
    })
    countryCode?: string;

    @property({
        type: 'string',
        required: false,
        jsonSchema: {
            enum: Object.values(TRANSPORT_TYPE),
        },
    })
    transportType?: string;
}
