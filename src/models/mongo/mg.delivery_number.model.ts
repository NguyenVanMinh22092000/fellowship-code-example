import mongoose, { Schema } from 'mongoose';
import { MgModification, MgModificationInterface } from '.';

export interface DeliveryNumberEntity extends MgModificationInterface {
    shippingCompanyId: string;
    countryCode: string;
    startNumber: number;
    endNumber: number;
    currentUseNumber: number;
    totalNumber: number;
    numberUsed: number;
    remainNumber: number;
    status: string;
    prefix: string;
    surfix: string;
    lastUsedDate: number;
    nameOfApplycompany: string;
    description: string;
    sellersApply: string[];
}

const modelSchema = new Schema<DeliveryNumberEntity>(
    {
        ...MgModification,
        shippingCompanyId: { type: String, required: false },
        countryCode: { type: String, required: false },
        startNumber: { type: Number, required: false },
        endNumber: { type: Number, required: false },
        currentUseNumber: { type: Number, required: false },
        totalNumber: { type: Number, required: false },
        numberUsed: { type: Number, required: false },
        remainNumber: { type: Number, required: false },
        status: { type: String, required: false },
        prefix: { type: String, required: false },
        surfix: { type: String, required: false },
        lastUsedDate: { type: Number, required: false },
        nameOfApplycompany: { type: String, required: false },
        description: { type: String, required: false },
        sellersApply: { type: [String], required: false },
    },
    { versionKey: false, collection: 'delivery_number' },
);
export const MgDeliveryNumber = mongoose.model<DeliveryNumberEntity>('MgDeliveryNumber', modelSchema);
