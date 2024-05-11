import { AppRespCodes } from '../constants';

import { getMgKeywordQuery, isObjectId, throwApiError, getRespPagination } from '../utils';

import { countryRepository, currencyExchangeRepository } from '../repositories';
import { CurrencyExchangeEntity } from '../models/mongo';

import { CurrencyExchange, CurrencyExchangeSearch } from '../models';

import { ACTION_LOG, TYPE_LOG } from '../enums';

export class CurrencyExchangeService {
    constructor() {
        console.log('🚀 init -> service-----> currency exchange');
    }

    async search(requestBody: CurrencyExchangeSearch, authedUser: any) {
        const { page, size, keyword, currencyBase } = requestBody || {};
        let query: any = { $and: [{ isDeleted: false, ...authedUser.modify }] };
        keyword /********/ && query.$and.push({ $or: getMgKeywordQuery(keyword, 'name') });
        currencyBase /***/ && query.$and.push({ currencyBase: { $in: currencyBase } });
        let total = await currencyExchangeRepository.count(query);
        if (!total) return null;

        let result = await currencyExchangeRepository.searchPage(
            query,
            ['-currencySymbol', '-referenceUnit'],
            { createdDate: -1 },
            page,
            size,
        );
        let currencyMap = await this.currencyMap(result);

        let items = result.map((item: any) => {
            let tmp = {};
            if (currencyMap) {
                let currency = currencyMap.get(item.currencyUnit);
                if (currency) {
                    tmp = { ...tmp, currencySymbol: currency.currencySymbol, referenceUnit: currency.referenceUnit };
                }
            }
            return { ...item._doc, ...tmp, exchangeRate: +item?.exchangeRate?.toString() };
        });
        return {
            ...getRespPagination(page, size, total),
            items,
        };
    }

    async currencyMap(items: any[]) {
        const _currencyUnits: string[] = items.map((item) => item.currencyUnit).filter((currencyUnit) => currencyUnit);

        if (!_currencyUnits) {
            return new Map<string, any>();
        }
        let searchQueryCurrency = {
            currencyUnit: { $in: _currencyUnits },
            isDeleted: { $ne: true },
        };

        let currencys = await countryRepository.searchBasic(searchQueryCurrency, [
            'currencyUnit',
            'currencySymbol',
            'referenceUnit',
        ]);
        return currencys.reduce((map, currency) => {
            map.set(currency.currencyUnit, currency);
            return map;
        }, new Map<string, any>());
    }

    async getAll(authedUser: any) {
        let query = { index: 1 };
        if (authedUser?.modify?.agentOrgId) {
            Object.assign(query, { agentOrgId: authedUser.modify.agentOrgId });
        }
        return await currencyExchangeRepository.getAll(query);
    }

    async create(requestBody: any, authedUser: any) {
        Object.assign(requestBody, { index: 0 }, authedUser.modify);
        return await currencyExchangeRepository.newCreate(
            requestBody,
            authedUser,
            ACTION_LOG.CREATE,
            TYPE_LOG.CURRENCY_EXCHANGE,
        );
    }

    async getById(_id: string) {
        if (!isObjectId(_id)) {
            throw throwApiError(AppRespCodes.INVALID_DATA, 'Id is not an objectId');
        }
        const query = {
            _id: _id,
            isDeleted: false,
        };
        let payload: any = await currencyExchangeRepository.mgFindOne(query, ['-currencySymbol', '-referenceUnit']);
        if (payload.currencyUnit) {
            let currency = await countryRepository.searchBasic(
                { currencyUnit: payload.currencyUnit, isDeleted: false },
                ['currencyUnit', 'currencySymbol', 'referenceUnit'],
            );
            if (currency) {
                Object.assign(payload, {
                    currencySymbol: currency[0].currencySymbol,
                    referenceUnit: currency[0].referenceUnit,
                });
            }
        }
        const { referenceUnit, currencySymbol, description, currencyBase, currencyUnit, activeStatus, exchangeRate } =
            payload || {};
        return {
            referenceUnit,
            _id,
            currencySymbol,
            description,
            currencyBase,
            currencyUnit,
            activeStatus,
            exchangeRate: +payload?.exchangeRate?.toString(),
        };
    }

    async update(_id: string, requestBody: CurrencyExchange, authedUser: any) {
        Object.assign(requestBody, { _id }, authedUser.modify);
        return await currencyExchangeRepository.upsert(
            requestBody as any,
            authedUser,
            ACTION_LOG.UPDATE,
            TYPE_LOG.CURRENCY_EXCHANGE,
        );
    }

    async delete(id: string, authedUser: any) {
        return await currencyExchangeRepository.deleteById(
            id,
            authedUser,
            ACTION_LOG.DELETE,
            TYPE_LOG.CURRENCY_EXCHANGE,
        );
    }

    async changeCurrency(originValue: number, targetCurrency: string = 'USD') {
        const searchQuery: any = { currencyUnit: targetCurrency };
        const target = await currencyExchangeRepository.findOne(searchQuery);
        if (target) {
            const exchangeRate = parseFloat(target?.exchangeRate.toString());
            return parseFloat((exchangeRate * originValue).toFixed(2));
        }
    }
}

export const currencyExchangeService = new CurrencyExchangeService();
