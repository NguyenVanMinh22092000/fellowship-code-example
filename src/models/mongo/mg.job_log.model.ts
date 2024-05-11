import mongoose, { Schema } from 'mongoose';
import { MgModificationInterface, MgModification } from '.';

export interface JobLogEntity extends MgModificationInterface {
    name: string;
    data: Object;
    status: string;
    nextRunAt: Date;
}

const agendaSchema = new Schema<JobLogEntity>(
    {
        ...MgModification,
        name: { type: String, required: false },
        data: { type: Object, required: false },
        status: { type: String, required: false },
        nextRunAt: { type: Date, required: false },
    },
    { versionKey: false, collection: 'job_log' },
);

export const MgJobLog = mongoose.model<JobLogEntity>('MgJobLog', agendaSchema);
