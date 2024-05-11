import mongoose, { Schema } from 'mongoose';
import { MgModification, MgModificationInterface } from '.';

export interface GhnCodeEntity extends MgModificationInterface {
    id: string;
    countryCode: string;
    code: string;
    name: string;
    postalCode: string;
    parentCode: string;
    level: number;
    levelName: string;
    nameRepresent: string[];
}

const modelSchema = new Schema<GhnCodeEntity>(
    {
        ...MgModification,
        id: { type: String, required: true },
        countryCode: { type: String, required: true },
        code: { type: String, required: true },
        postalCode: { type: String, required: false },
        name: { type: String, required: true },
        parentCode: { type: String, required: true },
        level: { type: Number, required: true },
        levelName: { type: String, required: true },
        nameRepresent: [],
    },
    { versionKey: false, collection: 'ghn_code' },
);

export const MgGhnCode = mongoose.model<GhnCodeEntity>('MgGhnCode', modelSchema);
