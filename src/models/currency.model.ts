import { Model, model, property } from '@loopback/repository';

@model()
export class Currency extends Model {
    @property({
        type: 'string',
    })
    currencyBase: string;

    @property({
        type: 'string',
    })
    countryCode: string;

    @property({
        type: 'string',
    })
    unit: string;

    @property({
        type: 'string',
    })
    symbol: string;

    @property({
        type: 'string',
    })
    desc: string;

    @property({
        type: 'string',
    })
    referenceUnit: string;

    @property({
        type: 'number',
    })
    exchangeRate: number;

    @property({
        type: 'string',
    })
    date: string;
}
