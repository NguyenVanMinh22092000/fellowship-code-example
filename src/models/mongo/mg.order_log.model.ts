import mongoose, { Schema } from 'mongoose';
import { MgModification, MgModificationInterface } from '.';

export interface OrderLogEntity extends MgModificationInterface {
    orderId: string;
    sellerOrgId: string;
    agentOrgId: string;
    action: string;
    prevData: AlteredField[];
    updatedData: AlteredField[];
}

export type AlteredField = {
    name: string;
    value: any;
};

const modelSchema = new Schema<OrderLogEntity>(
    {
        ...MgModification,
        orderId: { type: String, required: false },
        sellerOrgId: { type: String, required: false },
        agentOrgId: { type: String, required: false },
        action: { type: String, required: false },
        prevData: {
            type: [
                {
                    name: { type: String, required: true },
                    value: { type: Schema.Types.Mixed, required: true },
                },
            ],
            required: false,
            _id: false,
        },
        updatedData: {
            type: [
                {
                    name: { type: String, required: true },
                    value: { type: Schema.Types.Mixed, required: true },
                },
            ],
            required: false,
            _id: false,
        },
    },
    { versionKey: false, collection: 'order_log' },
);

export const MgOrderLog = mongoose.model<OrderLogEntity>('MgOrderLog', modelSchema);
