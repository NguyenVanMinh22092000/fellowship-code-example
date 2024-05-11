import mongoose, { Schema } from 'mongoose';

import { PRODUCT_STATUS } from '../../enums';
import { MgModification, MgModificationInterface } from '.';

export interface ProductEntity extends MgModificationInterface {
    activeStatus: string;
    sellerOrgId: string;
    agentOrgId: string;
    sku: string;
    barcode: string;
    brandName: string;
    avatar: string;
    names: { lang: string; value: string }[];
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
    photoUrl: string;
    link: string;
    keyword: string;
}

const modelSchema = new Schema<ProductEntity>(
    {
        ...MgModification,
        activeStatus: { type: String, default: PRODUCT_STATUS.IAC },
        sellerOrgId: { type: String, required: true },
        agentOrgId: { type: String, required: true },
        sku: { type: String, default: '' },
        barcode: { type: String, default: '' },
        brandName: { type: String, default: '' },
        avatar: { type: String, default: '' },
        names: {
            type: [
                {
                    lang: { type: String, default: '' },
                    value: { type: String, default: '' },
                },
            ],
            _id: false,
        },
        mainCategory: { type: String, default: '' },
        material: { type: String, default: '' },
        size: { type: Number, default: 0.0 },
        color: { type: String, default: '' },
        volume: { type: String, default: '' },
        salePrice: { type: Number, default: 0 },
        currencyUnit: { type: String, default: '' },
        origin: { type: String, default: '' },
        quantityUnit: { type: String, default: '' },
        totalWeight: { type: Number, default: 0.0 },
        netWeight: { type: Number, default: 0.0 },
        componentQuantity: { type: Number, default: 0 },
        lackNumber: { type: String, default: '' },
        memo: { type: String, default: '' },
        extraName: { type: String, default: '' },
        hscode: { type: String, default: '' },
        photoUrl: { type: String, default: '' },
        link: { type: String, default: '' },
        keyword: { type: String, default: '' },
    },
    { versionKey: false, collection: 'product' },
);

modelSchema.pre('save', function (next) {
    this.keyword = this.keyword.toLowerCase();
    next();
});

export const MgProduct = mongoose.model<ProductEntity>('mgProduct', modelSchema);
