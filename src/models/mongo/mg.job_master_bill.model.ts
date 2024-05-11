import mongoose, { Schema } from 'mongoose';
import { MgModificationInterface, MgModification } from '.';

export interface JobMasterBillEntity extends MgModificationInterface {
    name: string;
    data: Object;
    priority: number;
    shouldSaveResult: boolean;
    type: string;
    nextRunAt: Date;
    repeatInterval: string;
}

const agendaSchema = new Schema<JobMasterBillEntity>(
    {
        ...MgModification,
        name: { type: String, required: true },
        data: { type: Object, required: true },
        priority: { type: Number, required: true },
        shouldSaveResult: { type: Boolean, required: true },
        type: { type: String, required: true },
        nextRunAt: { type: Date, required: true },
        repeatInterval: { type: String, required: true },
    },
    { versionKey: false, collection: 'masterbill_job' },
);

export const MgJobMasterBill = mongoose.model<JobMasterBillEntity>('MgJobMasterBill', agendaSchema);
