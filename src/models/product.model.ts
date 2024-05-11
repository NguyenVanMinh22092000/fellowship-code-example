import { model, property } from '@loopback/repository';
import { Model } from 'mongoose';
import { CommonInfo, SearchBody } from '../models';

export class ProductRepresent {
    lang: string = '';
    value: string = '';
}

@model()
export class Product extends Model {
    @property({
        type: 'string',
        id: true,
        generated: true,
    })
    _id?: string;

    @property({
        type: 'string',
        default: 'IAC',
    })
    activeStatus?: string;

    @property({
        type: 'string',
    })
    sellerId?: string;

    @property({
        type: 'string',
    })
    sku?: string;

    @property({
        type: 'string',
    })
    barcode?: string;

    @property({
        type: 'string',
    })
    brandName?: string;

    @property.array(ProductRepresent)
    names?: ProductRepresent[];

    @property({
        type: 'string',
    })
    mainCategory?: string;

    @property({
        type: 'string',
    })
    material?: string;

    @property({
        type: 'number',
    })
    size?: number;

    @property({
        type: 'string',
    })
    color?: string;

    @property({
        type: 'string',
    })
    volume?: string;

    @property({
        type: 'number',
    })
    salePrice?: number;

    @property({
        type: 'string',
    })
    currencyUnit?: string;

    @property({
        type: 'string',
    })
    origin?: string;

    @property({
        type: 'string',
    })
    quantityUnit?: string;

    @property({
        type: 'number',
    })
    totalWeight?: number;

    @property({
        type: 'number',
    })
    netWeight?: number;

    @property({
        type: 'number',
    })
    componentQuantity?: number;

    @property({
        type: 'string',
    })
    lackNumber?: string;

    @property({
        type: 'string',
    })
    memo?: string;

    @property({
        type: 'string',
    })
    extraName?: string;

    @property({
        type: 'string',
    })
    hscode?: string;

    @property({
        type: 'string',
    })
    photoUrl?: string;
    @property({
        type: 'string',
    })
    link?: string;
}

@model()
export class ProductCreate extends Model {
    @property({
        type: 'string',
        required: true,
    })
    sku?: string;

    @property({
        type: 'string',
    })
    brandName?: string;

    @property({
        type: 'array',
        itemType: 'any',
    })
    names?: ProductRepresent[];

    @property({
        type: 'string',
    })
    mainCategory?: string;

    @property({
        type: 'string',
    })
    material?: string;

    @property({
        type: 'number',
    })
    size?: number;

    @property({
        type: 'string',
    })
    color?: string;

    @property({
        type: 'string',
    })
    volume?: string;

    @property({
        type: 'number',
    })
    salePrice?: number;

    @property({
        type: 'string',
    })
    currencyUnit?: string;

    @property({
        type: 'string',
    })
    origin?: string;

    @property({
        type: 'string',
    })
    quantityUnit?: string;

    @property({
        type: 'number',
    })
    totalWeight?: number;

    @property({
        type: 'number',
    })
    netWeight?: number;

    @property({
        type: 'number',
    })
    componentQuantity?: number;

    @property({
        type: 'string',
        default: '',
    })
    lackNumber?: string;

    @property({
        type: 'string',
        default: '',
    })
    memo?: string;

    @property({
        type: 'string',
        default: '',
    })
    extraName?: string;

    @property({
        type: 'string',
        default: '',
    })
    hscode?: string;

    @property({
        type: 'string',
        default: '',
    })
    photoUrl?: string;

    @property({
        type: 'string',
        required: true,
    })
    barcode?: string;
    @property({
        type: 'string',
    })
    link?: string;
}

@model()
export class ProductSearch extends SearchBody {
    @property({
        type: 'array',
        itemType: 'string',
        default: [],
    })
    activeStatus?: string[];
    @property({
        type: 'string',
        default: '',
    })
    keywordField: string;
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
export class ProductUpdate extends Model {
    @property({
        type: 'string',
        required: true,
    })
    _id?: string;

    @property({
        type: 'string',
        required: true,
    })
    sku?: string;

    @property({
        type: 'string',
    })
    barcode?: string;

    @property({
        type: 'string',
    })
    brandName?: string;

    @property({
        type: 'array',
        itemType: 'any',
    })
    names?: ProductRepresent[];

    @property({
        type: 'string',
    })
    mainCategory?: string;

    @property({
        type: 'string',
    })
    material?: string;

    @property({
        type: 'number',
    })
    size?: number;

    @property({
        type: 'string',
    })
    color?: string;

    @property({
        type: 'string',
    })
    volume?: string;

    @property({
        type: 'number',
    })
    salePrice?: number;

    @property({
        type: 'string',
    })
    currencyUnit?: string;

    @property({
        type: 'string',
    })
    origin?: string;

    @property({
        type: 'string',
    })
    quantityUnit?: string;

    @property({
        type: 'number',
    })
    totalWeight?: number;

    @property({
        type: 'number',
    })
    netWeight?: number;

    @property({
        type: 'number',
    })
    componentQuantity?: number;

    @property({
        type: 'string',
        default: '',
    })
    lackNumber?: string;

    @property({
        type: 'string',
        default: '',
    })
    memo?: string;

    @property({
        type: 'string',
        default: '',
    })
    extraName?: string;

    @property({
        type: 'string',
        default: '',
    })
    hscode?: string;

    @property({
        type: 'string',
        default: '',
    })
    photoUrl?: string;
    @property({
        type: 'string',
    })
    link?: string;
}

@model()
export class AgentProductSearch extends SearchBody {
    @property({
        type: 'array',
        itemType: 'string',
        default: [],
    })
    activeStatus?: string[];
    @property({
        type: 'string',
        default: '',
    })
    keywordField: string;
}

@model()
export class AgentProductUpdate {
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
    })
    isSeletedAll: boolean;
    @property({
        type: 'string',
        default: '',
    })
    activeStatus: string;
    @property({
        type: 'object',
        required: false,
    })
    filter?: ProductFilter;
}

declare type ProductName = {
    lang: string;
    nameText: string;
};

export declare type ProductSearchDto = {
    sku: string;
    brandName: string;
    names: ProductName[];
    mainCategory: string;
    material: string;
    size: number;
    color: string;
    volume: string;
    salePrice: number;
    currencyUnit: string;
    origin: string;
    quantityUnit: string;
    totalWeight: number;
    netWeight: number;
    componentQuantity: number;
    lackNumber: string;
    memo: string;
    extraName: string;
    hscode: string;

    photoUrl?: string;
    searchText?: string;
    sellerId?: string;
    barcode?: string;
    activeStatus: string;
} & CommonInfo;

export interface ProductFilter {
    activeStatus?: string[];
    keywordField: string;
    keyword?: string;
    sellerIds?: string[];
    agentIds?: string[];
}
