import { model, property } from '@loopback/repository';
import { Model } from 'mongoose';
import { USER_STATUS } from '../enums';
import { SearchBody } from './common.model';
import { ModificationModel } from './mongo';

@model()
export class Customer extends ModificationModel {
    @property({
        type: 'string',
        default: USER_STATUS.ACTIVE,
    })
    activeStatus?: string;

    @property({
        type: 'string',
    })
    fullName?: string[];

    @property({
        type: 'string',
    })
    phoneNumber1?: string;

    @property({
        type: 'string',
    })
    phoneNumber2?: string;

    @property({
        type: 'string',
    })
    email?: string;

    @property({
        type: 'string',
    })
    customerRefNo?: string;

    @property({
        type: 'string',
    })
    shippingCountryCode?: string;

    @property({
        type: 'object',
    })
    postalAddress?: object;

    @property({
        type: 'string',
    })
    searchText?: string;
}

@model()
export class PostalAddress extends Model {
    @property({
        type: 'string',
    })
    stateOrProvince?: string;

    @property({
        type: 'string',
    })
    city?: string;

    @property({
        type: 'string',
    })
    county?: string;

    @property({
        type: 'string',
    })
    buildingName?: string;

    @property({
        type: 'string',
    })
    streetName?: string;

    @property({
        type: 'string',
    })
    streetNumber?: string;

    @property({
        type: 'string',
    })
    countryCode?: string;

    @property({
        type: 'string',
    })
    postalCode?: string;

    @property({
        type: 'string',
    })
    fullAddress?: string;
}

@model()
export class CustomerSearchCommand extends SearchBody {
    @property({
        type: 'string',
        default: '',
    })
    field?: string;
    @property({
        type: 'array',
        itemType: 'string',
        default: [],
    })
    sellerIds?: string[];
    @property({
        type: 'array',
        itemType: 'string',
        default: [],
    })
    agentIds?: string[];
}

@model()
export class CustomerCrud extends Model {
    @property({
        type: 'string',
    })
    fullName?: string;

    @property({
        type: 'string',
        required: true,
    })
    phoneNumber1: string;

    @property({
        type: 'string',
    })
    phoneNumber2?: string;

    @property({
        type: 'string',
    })
    email?: string;

    @property({
        type: 'string',
    })
    customerRefNo?: string;

    @property({
        type: 'object',
    })
    postalAddress?: any;

    @property({
        type: 'string',
    })
    shippingCountryCode?: string;
}

@model()
export class CustomerDeleteManyCommand extends Model {
    @property({
        type: 'boolean',
    })
    isSelectAll?: boolean;

    @property({
        type: 'array',
        itemType: 'any',
    })
    excludeIds?: string[];

    @property({
        type: 'array',
        itemType: 'any',
    })
    ids?: string[];

    @property({
        type: 'object',
    })
    filter?: any;
}
