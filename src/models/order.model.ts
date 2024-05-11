import { model, property } from '@loopback/repository';
import { Model, ObjectId } from 'mongoose';
import { SearchBody, SearchDate } from '.';
import { GHN_TYPE, LABEL_SIZE, ORDER_STATUS, TRANSPORT_TYPE } from '../enums';

@model()
export class Order extends Model {
    @property({
        type: 'object',
        id: true,
        generated: true,
    })
    _id?: ObjectId;
    @property({
        type: 'number',
        required: true,
    })
    createdDate: number;
    @property({
        type: 'string',
        required: true,
    })
    orderNo01: string;

    @property({
        type: 'string',
        required: true,
    })
    orderNo02: string;

    @property({
        type: 'string',
        default: 'IAC',
    })
    activeStatus: string;

    @property({
        type: 'string',
        required: true,
    })
    orderStatus: string;

    @property({
        type: 'string',
        required: true,
    })
    destination: string;

    @property({
        type: 'string',
        required: false,
    })
    transportType?: string;

    @property({
        type: 'string',
        required: false,
    })
    agentOrgId: string;

    @property({
        type: 'string',
        required: false,
    })
    sellerOrgId: string;

    @property({
        type: 'boolean',
        default: false,
    })
    isSetMasterBill: boolean;

    @property({
        type: 'string',
    })
    masterBillId?: string;
    @property({
        type: 'string',
        required: false,
    })
    billNo: string;

    @property({
        type: 'number',
        required: true,
    })
    weight: number;

    @property({
        type: 'number',
        required: true,
    })
    boxCount: number;

    @property({
        type: 'string',
        required: true,
    })
    currencyUnit: string;

    @property({
        type: 'string',
        required: true,
    })
    deliveryMessage: string;

    @property({
        type: 'number',
        required: true,
    })
    width: number;

    @property({
        type: 'number',
        required: true,
    })
    length: number;

    @property({
        type: 'number',
        required: true,
    })
    height: number;

    @property({
        type: 'string',
        required: true,
    })
    userData1: string;

    @property({
        type: 'string',
        required: true,
    })
    userData2: string;

    @property({
        type: 'string',
        required: true,
    })
    userData3: string;

    @property({
        type: 'object',
        required: true,
    })
    sender: {
        name: string;
        address: string;
        phoneNumber: string;
    };

    @property({
        type: 'object',
        required: true,
    })
    receiver: {
        fullName: string;
        name: string;
        phoneNumber1: string;
        phoneNumber2: string;
        customerRefNo: string;
        email: string;
        shippingCountryCode: string;
        postalAddress: {
            countryCode: string;
            postalCode: string;
            stateOrProvince: string;
            city: string;
            county: string;
            streetName: string;
            streetNumber: string;
            buildingName: string;
            fullAddress: string;
        };
    };

    @property({
        type: 'array',
        itemType: 'object',
        required: false,
    })
    products: {
        productId: string;
        name: string;
        quantity: number;
        unitPrice: number;
        brand: string;
        barcode: string;
        capacity: number;
        hsCode: string;
        unit: string;
        link: string;
        sku: string;
    }[];
    deliverService: object;
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
    @property({
        type: 'number',
        required: false,
    })
    totalAmount?: number;
    @property({
        type: 'number',
        required: false,
    })
    deliveryFee?: number;
    @property({
        type: 'string',
        required: false,
    })
    memo?: string;
}

@model()
export class OrderCreate extends Model {
    @property({
        type: 'string',
        required: true,
    })
    orderNo01: string;

    @property({
        type: 'string',
        required: true,
    })
    orderNo02: string;

    @property({
        type: 'number',
        required: true,
    })
    weight: number;

    @property({
        type: 'number',
        required: true,
    })
    boxCount: number;

    @property({
        type: 'string',
        required: true,
    })
    currencyUnit: string;

    @property({
        type: 'string',
        required: false,
    })
    agentOrgId: string;

    @property({
        type: 'string',
        required: false,
    })
    sellerOrgId: string;

    @property({
        type: 'string',
        required: true,
    })
    deliveryMessage: string;

    @property({
        type: 'number',
        required: true,
    })
    width: number;

    @property({
        type: 'number',
        required: true,
    })
    length: number;

    @property({
        type: 'number',
        required: true,
    })
    height: number;

    @property({
        type: 'string',
        required: true,
    })
    userData1: string;

    @property({
        type: 'string',
        required: true,
    })
    userData2: string;

    @property({
        type: 'string',
        required: true,
    })
    userData3: string;
    @property({
        type: 'object',
        required: true,
    })
    sender: {
        name: string;
        address: string;
        phoneNumber: string;
    };
    @property({
        type: 'object',
        required: true,
        jsonSchema: {
            required: ['name'],
        },
    })
    receiver: {
        customerId: string;
        name: string;
        fullName: string;
        phoneNumber1: string;
        phoneNumber2: string;
        customerRefNo: string;
        email: string;
        shippingCountryCode: string;
        postalAddress: {
            countryCode: string;
            postalCode: string;
            stateOrProvince: string;
            city: string;
            county: string;
            streetName: string;
            streetNumber: string;
            buildingName: string;
            fullAddress: string;
        };
    };

    @property({
        type: 'array',
        itemType: 'object',
        required: true,
    })
    products: {
        productId: string;
        name: string;
        quantity: number;
        unitPrice: number;
        brand: string;
        barcode: string;
        capacity: number;
        hsCode: string;
        unit: string;
        link: string;
        sku: string;
    }[];
    @property({
        type: 'number',
        required: false,
    })
    actualWeight?: number;
    @property({
        type: 'number',
        required: false,
    })
    volumetricWeight?: number;
    @property({
        type: 'boolean',
        required: false,
        default: false,
    })
    isPrintedLabel?: boolean;

    @property({
        type: 'string',
        required: false,
    })
    deliveryProvider?: string;
}

@model()
export class OrderSearch extends SearchBody {
    @property({
        type: 'array',
        itemType: 'string',
        default: [],
    })
    orderStatus?: string[];
    @property({
        type: 'array',
        itemType: 'string',
        default: [],
    })
    transportType?: string[];
    @property({
        type: 'string',
        required: false,
    })
    field?: string;
    @property({
        type: 'string',
        required: false,
    })
    countryCode?: string;
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

    @property({
        type: 'string',
        required: false,
    })
    isPrintedLabel?: string;
    @property({
        type: 'string',
        required: false,
    })
    isSetMasterBill?: string;
    @property({
        type: 'array',
        itemType: 'string',
        default: [],
    })
    deliveryProvider?: string[];
}

@model()
export class OrderUpdate extends Model {
    @property({
        type: 'string',
        required: false,
    })
    agentOrgId: string;

    @property({
        type: 'string',
        required: false,
    })
    sellerOrgId: string;
    @property({
        type: 'string',
        required: true,
    })
    _id: string;
    @property({
        type: 'string',
        required: false,
    })
    orderNo01?: string;

    @property({
        type: 'string',
        required: false,
    })
    orderNo02?: string;

    @property({
        type: 'string',
        required: false,
    })
    destination?: string;

    @property({
        type: 'string',
        required: false,
        jsonSchema: {
            enum: Object.values(TRANSPORT_TYPE),
        },
    })
    transportType?: TRANSPORT_TYPE;

    @property({
        type: 'number',
        required: false,
    })
    weight?: number;

    @property({
        type: 'number',
        required: false,
    })
    boxCount?: number;

    @property({
        type: 'string',
        required: false,
    })
    currencyUnit?: string;

    @property({
        type: 'string',
        required: false,
    })
    deliveryMessage?: string;

    @property({
        type: 'number',
        required: false,
    })
    width?: number;

    @property({
        type: 'number',
        required: false,
    })
    length?: number;

    @property({
        type: 'number',
        required: false,
    })
    height?: number;

    @property({
        type: 'string',
        required: false,
    })
    userData1?: string;

    @property({
        type: 'string',
        required: false,
    })
    userData2?: string;

    @property({
        type: 'string',
        required: false,
    })
    userData3?: string;
    @property({
        type: 'object',
        required: false,
    })
    sender?: {
        name: string;
        address: string;
        phoneNumber: string;
    };
    @property({
        type: 'object',
        required: false,
    })
    receiver?: {
        name: string;
        fullName: string;
        phoneNumber1: string;
        phoneNumber2: string;
        customerRefNo: string;
        email: string;
        shippingCountryCode: string;
        postalAddress: {
            countryCode: string;
            postalCode: string;
            stateOrProvince: string;
            city: string;
            county: string;
            streetName: string;
            streetNumber: string;
            buildingName: string;
            fullAddress: string;
        };
    };

    @property({
        type: 'array',
        itemType: 'object',
        required: false,
    })
    products?: {
        name: string;
        quantity: number;
        unitPrice: number;
        brand: string;
        barcode: string;
    }[];
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
export class OrderCompleteWarehouse extends Model {
    @property({
        type: 'number',
        required: false,
    })
    page?: number;
    @property({
        type: 'number',
        required: false,
    })
    size?: number;
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
    filter?: OrderFilter;
}

@model()
export class OrderExport extends Model {
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
    filter?: OrderFilter;
}

@model()
export class OrderUpdateStatus extends Model {
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
            enum: Object.values(ORDER_STATUS),
        },
    })
    orderStatus: ORDER_STATUS;
    @property({
        type: 'object',
        required: false,
    })
    filter?: OrderFilter;
}
export interface OrderFilter {
    field?: string;
    countryCode?: string;
    keyword?: string;
    createdDate?: SearchDate;
    sellerIds?: string[];
    agentIds?: string[];
    isPrintedLabel?: string;
    isSetMasterBill?: string;
    deliveryProvider?: string[];
}

@model()
export class OrderGetByMasterbillId extends Model {
    @property({
        type: 'number',
        required: false,
    })
    page?: number;

    @property({
        type: 'number',
        required: false,
    })
    size?: number;

    @property({
        type: 'object',
    })
    createdDate?: SearchDate;
    @property({
        type: 'string',
        required: false,
    })
    _id: string;
    @property({
        type: 'object',
        required: false,
    })
    filter?: OrderFilter;
}

@model()
export class OrderPrintMany extends Model {
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
        required: false,
        jsonSchema: {
            enum: Object.values(ORDER_STATUS),
        },
    })
    orderStatus?: ORDER_STATUS;
    @property({
        type: 'string',
        required: false,
        jsonSchema: {
            enum: Object.values(LABEL_SIZE),
        },
    })
    size?: string;
    @property({
        type: 'object',
        required: false,
    })
    filter?: OrderFilter;
}

export class OrderWebhookProcesser extends Model {
    @property({
        type: 'number',
    })
    CODAmount?: number;

    @property({
        type: 'date',
    })
    CODTransferDate?: Date;

    @property({
        type: 'string',
    })
    ClientOrderCode?: string;

    @property({
        type: 'number',
    })
    ConvertedWeight?: number;

    @property({
        type: 'string',
    })
    Description?: string;

    @property({
        type: 'object',
    })
    Fee?: {
        CODFailedFee?: number;
        CODFee?: number;
        Coupon?: number;
        DeliverRemoteAreasFee?: number;
        DocumentReturn?: number;
        DoubleCheck?: number;
        Insurance?: number;
        MainService?: number;
        PickRemoteAreasFee?: number;
        R2S?: number;
        Return?: number;
        StationDO?: number;
        StationPU?: number;
        Total?: number;
    };

    @property({
        type: 'number',
    })
    Height?: number;

    @property({
        type: 'boolean',
    })
    IsPartialReturn?: boolean;

    @property({
        type: 'number',
    })
    Length?: number;

    @property({
        type: 'string',
    })
    OrderCode?: string;

    @property({
        type: 'string',
    })
    PartialReturnCode?: string;

    @property({
        type: 'number',
    })
    PaymentType?: number;

    @property({
        type: 'string',
    })
    Reason?: string;

    @property({
        type: 'string',
    })
    ReasonCode?: string;

    @property({
        type: 'number',
    })
    ShopID?: number;

    @property({
        type: 'string',
    })
    Status?: string;

    @property({
        type: 'date',
    })
    Time?: Date;

    @property({
        type: 'number',
    })
    TotalFee?: number;

    @property({
        type: GHN_TYPE,
    })
    Type?: string;

    @property({
        type: 'string',
    })
    Warehouse?: string;

    @property({
        type: 'number',
    })
    Weight?: number;

    @property({
        type: 'number',
    })
    Width?: number;
}

@model()
export class OrderTrack extends Model {
    @property({
        type: 'array',
        itemType: 'string',
        default: [],
    })
    ids?: string[];
}

const senderObject: string = 'sender';
const receiverObject: string = 'receiver';
const productObject: string = 'product';
const orderObject: string = 'order';
const postalObject: string = 'postalAddress';
export const IMPORT_TYPE = {
    NUMBER: 'number',
    COUNTRY_CODE: 'countryCode',
    CURRENCY_UNIT: 'currencyUnit',
    PHONE_NUMBER: 'phoneNumber',
    TRANSPORT_TYPE: 'transportType',
};

export const fieldImportMappings = [
    {
        header: 'Destination',
        target: 'countryCode',
        targetObject: postalObject,
        isRequired: true,
        type: IMPORT_TYPE.COUNTRY_CODE,
    },
    {
        header: 'DeliveryType',
        target: 'transportType',
        targetObject: orderObject,
        type: IMPORT_TYPE.TRANSPORT_TYPE,
        isRequired: true,
    },
    { header: 'OrderNo1', target: 'orderNo01', targetObject: orderObject, isRequired: true },
    { header: 'OrderNo2', target: 'orderNo02', targetObject: orderObject },
    { header: 'SenderName', target: 'name', targetObject: senderObject, isRequired: true },
    {
        header: 'SenderTelNo',
        target: 'phoneNumber',
        targetObject: senderObject,
        type: IMPORT_TYPE.PHONE_NUMBER,
        isRequired: true,
    },
    { header: 'SenderAddress', target: 'address', targetObject: senderObject, isRequired: true },
    { header: 'RecipientName', target: 'name', targetObject: receiverObject, isRequired: true },
    {
        header: 'RecipientTelNo1',
        target: 'phoneNumber1',
        targetObject: receiverObject,
        type: IMPORT_TYPE.PHONE_NUMBER,
        isRequired: true,
    },
    { header: 'RecipientTelNo2', target: 'phoneNumber2', targetObject: receiverObject, type: IMPORT_TYPE.PHONE_NUMBER },
    { header: 'ZipCode', target: 'postalCode', targetObject: postalObject },
    { header: 'State', target: 'stateOrProvince', targetObject: postalObject, isRequired: false },
    { header: 'City', target: 'stateOrProvinceText', targetObject: postalObject, isRequired: true },
    { header: 'District', target: 'countyText', targetObject: postalObject, isRequired: true },
    { header: 'Ward', target: 'buildingNameText', targetObject: postalObject, isRequired: true },
    { header: 'Address2', target: 'fullAddress', targetObject: postalObject, isRequired: true },
    { header: 'IdNumber', target: 'customerId', targetObject: receiverObject },
    { header: 'Weight', target: 'weight', targetObject: orderObject, type: IMPORT_TYPE.NUMBER, isRequired: true },
    { header: 'BoxCount', target: 'boxCount', targetObject: orderObject, type: IMPORT_TYPE.NUMBER, isRequired: true },
    {
        header: 'CurrencyUnit',
        target: 'currencyUnit',
        targetObject: orderObject,
        type: IMPORT_TYPE.CURRENCY_UNIT,
        isRequired: true,
    },
    { header: 'DeliveryMessage', target: 'deliveryMessage', targetObject: orderObject },
    { header: 'UserData1', target: 'userData1', targetObject: orderObject },
    { header: 'UserData2', target: 'userData2', targetObject: orderObject },
    { header: 'UserData3', target: 'userData3', targetObject: orderObject },
    { header: 'Width', target: 'width', targetObject: orderObject, type: IMPORT_TYPE.NUMBER, isRequired: true },
    { header: 'Height', target: 'height', targetObject: orderObject, type: IMPORT_TYPE.NUMBER, isRequired: true },
    { header: 'Length', target: 'length', targetObject: orderObject, type: IMPORT_TYPE.NUMBER, isRequired: true },
    { header: 'ProductName', target: 'name', targetObject: productObject, isRequired: true },
    { header: 'Qty', target: 'quantity', targetObject: productObject, type: IMPORT_TYPE.NUMBER, isRequired: true },
    {
        header: 'UnitPrice',
        target: 'unitPrice',
        targetObject: productObject,
        type: IMPORT_TYPE.NUMBER,
        isRequired: true,
    },
    { header: 'Brand', target: 'brand', targetObject: productObject, isRequired: true },
    { header: 'Capacity', target: 'capacity', targetObject: productObject },
    { header: 'Unit', target: 'unit', targetObject: productObject },
    { header: 'Sku', target: 'sku', targetObject: productObject },
    { header: 'HsCode', target: 'hsCode', targetObject: productObject },
    { header: 'Link', target: 'link', targetObject: productObject, isRequired: true },
];
