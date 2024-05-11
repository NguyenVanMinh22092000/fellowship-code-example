import { CurrencyExchangeEntity, MgCurrencyExchange } from '../models/mongo/mg.currency_exchange.model';
import { GenericRepository } from './generic.repository';

export class CurrencyExchangeRepository extends GenericRepository<CurrencyExchangeEntity> {
    constructor() {
        console.log('🚀 init -> repository -> currency exchange');
        super(MgCurrencyExchange);
    }
}

export const currencyExchangeRepository = new CurrencyExchangeRepository();
