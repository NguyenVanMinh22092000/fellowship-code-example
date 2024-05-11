import mongoose, { Schema } from 'mongoose';
import { MgModification, MgModificationInterface } from '.';

export interface CountryEntity extends MgModificationInterface {
    countryCode: string;
    name: string;
    index: number;
    weightUnit: string;
    currencyUnit: string;
    currencySymbol: string;
    referenceUnit: number;
}

const modelSchema = new Schema<CountryEntity>(
    {
        ...MgModification,
        countryCode: { type: String, required: true },
        name: { type: String, required: true },
        index: { type: Number, required: true },
        weightUnit: { type: String, required: true },
        currencyUnit: { type: String, required: true },
        currencySymbol: { type: String, required: true },
        referenceUnit: { type: Number, required: true },
    },
    { versionKey: false, collection: 'country' },
);

export const MgCountry = mongoose.model<CountryEntity>('MgCountry', modelSchema);
