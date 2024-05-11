import mongoose, { Schema } from 'mongoose';
import { MgModification, MgModificationInterface } from '.';

export interface ViewLayoutEntity extends MgModificationInterface {
    userId: string;
    orderViews: string[];
    masterBillViews: string[];
}

const modelSchema = new Schema<ViewLayoutEntity>(
    {
        ...MgModification,
        userId: { type: String, required: true },
        orderViews: { type: [String], default: [] },
        masterBillViews: { type: [String], default: [] },
    },
    { versionKey: false, collection: 'view_layout' },
);

export const MgViewLayout = mongoose.model<ViewLayoutEntity>('MgViewLayout', modelSchema);
