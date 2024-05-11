import { model, property } from '@loopback/repository';
import { Model } from 'mongoose';
import { SearchBody, SearchDate } from '.';
import { BILL_STATUS, TRANSPORT_TYPE } from '../enums';

@model()
export class MasterBill extends Model {
    @property({
        type: 'string',
        required: true,
    })
    billNo: string;

    @property({
        type: 'string',
        required: true,
        jsonSchema: {
            enum: Object.values(BILL_STATUS),
        },
    })
    billStatus: string;

    @property({
        type: 'string',
        required: true,
        jsonSchema: {
            enum: Object.values(TRANSPORT_TYPE),
        },
    })
    transportType: string;

    @property({
        type: 'string',
        required: true,
    })
    vehicleNumber: string;

    @property({
        type: 'number',
        required: true,
    })
    netWeight: number;

    @property({
        type: 'number',
        required: true,
    })
    chargeableWeight: number;

    @property({
        type: 'string',
        required: false,
    })
    memo?: string;

    @property({
        type: 'string',
        required: true,
    })
    note: string;

    @property({
        type: 'object',
        required: true,
    })
    departure: {
        countryCode: string;
        transportCode: string;
    };

    @property({
        type: 'object',
        required: true,
    })
    destination: {
        countryCode: string;
        transportCode: string;
    };

    @property({
        type: 'number',
        required: true,
    })
    departureTime: number;

    @property({
        type: 'number',
        required: true,
    })
    arriveTime: number;

    @property({
        type: 'number',
        required: true,
    })
    customesProcessingTime: number;

    @property({
        type: 'number',
        required: true,
    })
    customesClearanceTime: number;

    @property({
        type: 'array',
        itemType: 'string',
        required: false,
    })
    orders?: string[];
    @property({
        type: 'boolean',
        required: false,
    })
    isPrintedLabel?: boolean;

    @property({
        type: 'string',
        required: false,
    })
    deliveryProvider?: string;
}

@model()
export class MasterBillCreate extends Model {
    @property({
        type: 'string',
        required: true,
    })
    billNo: string;

    @property({
        type: 'string',
        required: true,
        jsonSchema: {
            enum: Object.values(TRANSPORT_TYPE),
        },
    })
    transportType: string;

    @property({
        type: 'string',
        required: true,
    })
    vehicleNumber: string;

    @property({
        type: 'number',
        required: true,
    })
    netWeight: number;

    @property({
        type: 'number',
        required: true,
    })
    chargeableWeight: number;

    @property({
        type: 'string',
        required: false,
    })
    memo?: string;

    @property({
        type: 'string',
        required: false,
    })
    note?: string;

    @property({
        type: 'object',
        required: true,
    })
    departure: {
        countryCode: string;
        transportCode: string;
    };

    @property({
        type: 'object',
        required: true,
    })
    destination: {
        countryCode: string;
        transportCode: string;
    };

    @property({
        type: 'number',
        required: true,
    })
    departureTime: number;

    @property({
        type: 'number',
        required: true,
    })
    arriveTime: number;

    @property({
        type: 'number',
        required: true,
    })
    customesProcessingTime: number;

    @property({
        type: 'number',
        required: true,
    })
    customesClearanceTime: number;

    @property({
        type: 'array',
        itemType: 'string',
        required: false,
    })
    orders?: string[];
    @property({
        type: 'boolean',
        required: false,
    })
    isPrintedLabel?: boolean;

    @property({
        type: 'string',
        required: false,
    })
    deliveryProvider?: string;
}

@model()
export class MasterBillSearch extends SearchBody {
    @property({
        type: 'string',
        required: false,
    })
    countryCode?: string;
    @property({
        type: 'string',
        required: false,
    })
    field?: string;
    @property({
        type: 'string',
        required: false,
        jsonSchema: {
            enum: Object.values(TRANSPORT_TYPE),
        },
    })
    transportType?: string;
    @property({
        type: 'array',
        itemType: 'string',
        default: [],
    })
    billStatus?: string[];
    @property({
        type: 'array',
        itemType: 'string',
        default: [],
    })
    agentIds?: string[];
}

@model()
export class MasterBillUpdate extends Model {
    @property({
        type: 'string',
        required: true,
    })
    _id: string;
    @property({
        type: 'string',
        required: false,
    })
    billNo?: string;
    @property({
        type: 'string',
        required: false,
        jsonSchema: {
            enum: Object.values(BILL_STATUS),
        },
    })
    billStatus?: string;
    @property({
        type: 'string',
        required: false,
        jsonSchema: {
            enum: Object.values(TRANSPORT_TYPE),
        },
    })
    transportType?: string;

    @property({
        type: 'string',
        required: false,
    })
    vehicleNumber?: string;

    @property({
        type: 'number',
        required: false,
    })
    netWeight?: number;

    @property({
        type: 'number',
        required: false,
    })
    chargeableWeight?: number;

    @property({
        type: 'string',
        required: false,
    })
    memo?: string;

    @property({
        type: 'string',
        required: false,
    })
    note?: string;

    @property({
        type: 'object',
        required: false,
    })
    departure?: {
        countryCode: string;
        transportCode: string;
    };

    @property({
        type: 'object',
        required: false,
    })
    destination?: {
        countryCode: string;
        transportCode: string;
    };

    @property({
        type: 'number',
        required: false,
    })
    departureTime?: number;

    @property({
        type: 'number',
        required: false,
    })
    arriveTime?: number;

    @property({
        type: 'number',
        required: false,
    })
    customesProcessingTime?: number;

    @property({
        type: 'number',
        required: false,
    })
    customesClearanceTime?: number;

    @property({
        type: 'array',
        itemType: 'string',
        required: false,
    })
    orders?: string[];
    @property({
        type: 'boolean',
        required: false,
    })
    isPrintedLabel?: boolean;

    @property({
        type: 'string',
        required: false,
    })
    deliveryProvider?: string;
}

@model()
export class MasterBillUpdateStatus extends Model {
    @property({
        type: 'array',
        itemType: 'string',
        default: [],
    })
    ids?: string[];
    @property({
        type: 'array',
        itemType: 'string',
        default: [],
    })
    excludeIds?: string[];
    @property({
        type: 'boolean',
        required: false,
    })
    isSelectAll?: boolean;
    @property({
        type: 'string',
        required: true,
        jsonSchema: {
            enum: Object.values(BILL_STATUS),
        },
    })
    billStatus: string;
    @property({
        type: 'object',
        required: false,
    })
    filter?: MasterBillFilter;
}
export interface MasterBillFilter {
    field?: string;
    countryCode?: string;
    keyword?: string;
    createdDate?: SearchDate;
    transportType?: string;
    billStatus?: BILL_STATUS[];
    agentIds?: string[];
}

@model()
export class MasterBillExport extends Model {
    @property({
        type: 'array',
        itemType: 'string',
        default: [],
    })
    ids?: string[];
    @property({
        type: 'array',
        itemType: 'string',
        default: [],
    })
    excludeIds?: string[];
    @property({
        type: 'boolean',
        required: false,
    })
    isSelectAll?: boolean;
    @property({
        type: 'object',
        required: false,
    })
    filter?: MasterBillFilter;
}

export interface JobUpdateStatus {
    status: BILL_STATUS;
    id: string;
    userInfo: any;
}
