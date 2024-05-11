import mongoose, { Schema } from 'mongoose';
import { MgModification, MgModificationInterface } from '.';
import { BILL_STATUS } from '../../enums';

export interface MasterBillStatusLogEntity extends MgModificationInterface {
    masterBillId: string;
    agentOrgId: string;
    isSystem: boolean;
    changedDate: number;
    prevStatus: BILL_STATUS;
    newStatus: BILL_STATUS;
}

const modelSchema = new Schema<MasterBillStatusLogEntity>(
    {
        ...MgModification,
        masterBillId: { type: String, required: false },
        agentOrgId: { type: String, required: false },
        isSystem: { type: Boolean, required: false },
        changedDate: { type: Number, required: false },
        prevStatus: { type: String, required: false },
        newStatus: { type: String, required: false },
    },
    { versionKey: false, collection: 'masterbill_status_log' },
);

export const MgMasterBillStatusLog = mongoose.model<MasterBillStatusLogEntity>('MgMasterBillStatusLog', modelSchema);
