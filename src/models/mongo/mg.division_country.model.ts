import mongoose, { Schema } from 'mongoose';
import { MgModification, MgModificationInterface } from '.';

export interface DivisionCountryEntity extends MgModificationInterface {
    countryCode: string;
    code: string;
    zipCode: string;
    name: string;
    parentCode: string;
    level: number;
    levelName: string;
    nameRepresent: string[];
}

const modelSchema = new Schema<DivisionCountryEntity>(
    {
        ...MgModification,
        countryCode: { type: String, required: true },
        code: { type: String, required: true },
        zipCode: { type: String, required: false },
        name: { type: String, required: true },
        parentCode: { type: String, required: true },
        level: { type: Number, required: true },
        levelName: { type: String, required: true },
        nameRepresent: [],
    },
    { versionKey: false, collection: 'division_country2' },
);

export const MgDivisionCountry = mongoose.model<DivisionCountryEntity>('MgDivisionCountry', modelSchema);
