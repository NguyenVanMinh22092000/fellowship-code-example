import mongoose, { Schema } from 'mongoose';
import { MgModification, MgModificationInterface } from '.';

export interface CurrencyExchangeEntity extends MgModificationInterface {
    currencyBase: string;
    currencyUnit: string;
    currencySymbol: string;
    referenceUnit: number;
    exchangeRate: mongoose.Types.Decimal128;
    description: string;
}

const modelSchema = new Schema<CurrencyExchangeEntity>(
    {
        ...MgModification,
        currencyBase: { type: String, required: true },
        currencyUnit: { type: String, required: true },
        currencySymbol: { type: String, required: true },
        referenceUnit: { type: Number, required: true },
        exchangeRate: { type: mongoose.Types.Decimal128, required: true },
        description: { type: String },
    },
    { versionKey: false, collection: 'currency_exchange' },
);

export const MgCurrencyExchange = mongoose.model<CurrencyExchangeEntity>('MgCurrencyExchange', modelSchema);
