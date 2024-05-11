import { Model, model, property } from '@loopback/repository';
import { SearchBody } from './common.model';
import mongoose from 'mongoose';

@model()
export class CurrencyExchange extends Model {
    @property({
        type: 'string',
    })
    currencyBase: string;

    @property({
        type: 'string',
    })
    currencyUnit: string;

    @property({
        type: 'string',
    })
    currencySymbol: string;

    @property({
        type: 'number',
    })
    referenceUnit: number;
    @property({
        type: 'number',
    })
    exchangeRate: mongoose.Types.Decimal128;

    @property({
        type: 'string',
    })
    description: string;
}

@model()
export class CurrencyExchangeSearch extends SearchBody {
    @property({
        type: 'string',
    })
    currencyBase: string;
}
