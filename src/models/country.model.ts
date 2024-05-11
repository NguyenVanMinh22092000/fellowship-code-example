import { model, property } from '@loopback/repository';
import { Model, ObjectId } from 'mongoose';
@model()
export class Country extends Model {
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
        type: 'number',
    })
    index?: number;

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
        required: true,
    })
    countryCode: string;

    @property({
        type: 'string',
        required: true,
    })
    name: string;

    @property({
        type: 'string',
        required: true,
    })
    currencyUnit: string;

    @property({
        type: 'string',
        required: true,
    })
    currencySymbol: string;

    @property({
        type: 'number',
        required: true,
    })
    referenceUnit: number;

    @property({
        type: 'string',
        required: true,
    })
    weightUnit: string;
}
