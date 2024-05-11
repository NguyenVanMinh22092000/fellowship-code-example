import mongoose, { Schema } from 'mongoose';
import { MgModification, MgModificationInterface } from '.';

export interface LocalShipmentEntity extends MgModificationInterface {
    countryCode: string;
    shippingCompanyId: string;
    deliveryCompany: string;
    website: string;
    userInput: string;
    accountNo: string;
    memo: string;
}

const modelSchema = new Schema<LocalShipmentEntity>(
    {
        ...MgModification,
        countryCode: { type: String, required: true },
        shippingCompanyId: { type: String, required: true },
        deliveryCompany: { type: String, required: true },
        website: { type: String, required: true },
        userInput: { type: String, required: true },
        accountNo: { type: String, required: false },
        memo: { type: String, required: false },
    },
    { versionKey: false, collection: 'local_shipment' },
);

export const MgLocalShipment = mongoose.model<LocalShipmentEntity>('MgLocalShipment', modelSchema);
