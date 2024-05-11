import mongoose, { Schema } from 'mongoose';
import { MgModification, MgModificationInterface } from '.';

export interface TransportCodeEntity extends MgModificationInterface {
    countryCode: string;
    transportCode: string;
    name: string;
    location: string;
    activeStatus: string;
    transportType: string;
}

const modelSchema = new Schema<TransportCodeEntity>(
    {
        ...MgModification,
        countryCode: { type: String, required: true },
        transportCode: { type: String, required: true },
        name: { type: String, required: true },
        location: { type: String, required: true },
        activeStatus: { type: String, required: false },
        transportType: { type: String, required: true },
    },
    { versionKey: false, collection: 'transport_code' },
);

export const MgTransportCode = mongoose.model<TransportCodeEntity>('MgTransportCode', modelSchema);
