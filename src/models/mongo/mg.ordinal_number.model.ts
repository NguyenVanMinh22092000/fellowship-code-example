import mongoose, { Schema } from 'mongoose';
import { MgModification, MgModificationInterface } from '.';

export interface OrdinalNumberEntity extends MgModificationInterface {
    type: string;
    ordinalNumber: number;
    currentYear: number;
}

const modelSchema = new Schema<OrdinalNumberEntity>(
    {
        ...MgModification,
        type: { type: String, required: false },
        ordinalNumber: { type: Number, required: false },
        currentYear: { type: Number, required: false },
    },
    { versionKey: false, collection: 'ordinal_number' },
);

export const MgOrdinalNumber = mongoose.model<OrdinalNumberEntity>('MgOrdinalNumber ', modelSchema);
