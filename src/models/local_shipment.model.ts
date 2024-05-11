import { model, property } from '@loopback/repository';
import { Model, ObjectId } from 'mongoose';
import { SearchBody } from '.';

@model()
export class LocalShipment extends Model {
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
    shippingCompanyId: string;

    @property({
        type: 'string',
    })
    deliveryCompany: string;

    @property({
        type: 'string',
    })
    website: string;

    @property({
        type: 'string',
    })
    userInput: string;

    @property({
        type: 'string',
        required: false,
    })
    accountNo?: string;

    @property({
        type: 'string',
        required: false,
    })
    memo?: string;
}

@model()
export class LocalShipmentSearchBody extends SearchBody {
    @property({
        type: 'string',
    })
    countryCode: string;
}
