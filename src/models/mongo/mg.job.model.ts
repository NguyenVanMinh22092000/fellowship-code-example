import mongoose, { Schema } from 'mongoose';
import { MgModificationInterface, MgModification } from '.';

export interface JobEntity extends MgModificationInterface {
    name: string;
    data: Object;
    priority: number;
    shouldSaveResult: boolean;
    type: string;
    service: string;
    sessionId: string;
    nextRunAt: Date;
    repeatInterval: string;
}

const agendaSchema = new Schema<JobEntity>(
    {
        ...MgModification,
        name: { type: String, required: true },
        data: { type: Object, required: true },
        priority: { type: Number, required: true },
        shouldSaveResult: { type: Boolean, required: true },
        type: { type: String, required: true },
        service: { type: String, required: true },
        sessionId: { type: String, required: true },
        nextRunAt: { type: Date, required: true },
        repeatInterval: { type: String, required: true },
    },
    { versionKey: false, collection: 'job' },
);

export const MgJob = mongoose.model<JobEntity>('MgJob', agendaSchema);
