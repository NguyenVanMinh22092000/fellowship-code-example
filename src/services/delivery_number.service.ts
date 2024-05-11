import { AppRespCodes } from '../constants';

import { throwApiError } from '../utils/api.util';
import { isObjectId, getRespPagination, getMgKeywordQuery } from '../utils';

import {
    LogRepos,
    SellerRepository,
    deliveryNumberRepository,
    localShipmentRepository,
    sellerRepository,
} from '../repositories';

import { SearchBody } from '../models';

import { ACTION_LOG, TYPE_LOG } from '../enums';

export class DeliveryNumberService {
    constructor() {
        console.log('🚀 init -> service-----> delivery number');
    }
    sellerRepository = new SellerRepository();

    async search(requestBody: SearchBody, authedUser: any) {
        const { page, size, keyword } = requestBody || {};
        let query = { ...authedUser.modify, $and: [{ isDeleted: false }] };

        keyword /*****/ && query.$and.push({ $or: getMgKeywordQuery(keyword, 'prefix surfix nameOfApplycompany') });

        let total = await deliveryNumberRepository.count(query);
        if (!total) return null;

        let result = await deliveryNumberRepository.searchPage(query, [], { createdDate: -1 }, page, size);

        let shippingCompanyMap = await this.localShipmentMap(result);
        let nameOfApplycompanyMap = await this.sellerMap(result);

        let items = result.map((item: any) => {
            let tmp = {};
            if (item.shippingCompanyId) {
                let deliveryCompany = shippingCompanyMap.get(item.shippingCompanyId)?.deliveryCompany;
                if (deliveryCompany) {
                    tmp = { ...tmp, deliveryCompany: deliveryCompany };
                }
            }
            if (item.sellersApply) {
                if (item.sellersApply.includes('all')) {
                    tmp = { ...tmp, nameOfApplycompany: 'all' };
                } else {
                    let nameOfApplycompany = [];
                    for (const seller of item.sellersApply) {
                        let sellerName = nameOfApplycompanyMap.get(seller)?.name;
                        if (sellerName) {
                            nameOfApplycompany.push(sellerName);
                        }
                    }
                    tmp = { ...tmp, nameOfApplycompany: nameOfApplycompany.join(' , ') };
                }
            }
            return { ...item._doc, ...tmp };
        });
        return {
            ...getRespPagination(page, size, total),
            items,
        };
    }

    async localShipmentMap(items: any[]) {
        const _shippingCompanyIds: string[] = items
            .map((item) => item.shippingCompanyId)
            .filter((shippingCompanyId) => shippingCompanyId);

        if (!_shippingCompanyIds) {
            return new Map<string, any>();
        }
        let searchQuery = {
            shippingCompanyId: { $in: _shippingCompanyIds },
            isDeleted: { $ne: true },
        };

        let shippingCompanys = await localShipmentRepository.searchBasic(searchQuery, [
            'shippingCompanyId',
            'deliveryCompany',
        ]);
        return shippingCompanys.reduce((map, shippingCompany) => {
            map.set(shippingCompany.shippingCompanyId, shippingCompany);
            return map;
        }, new Map<string, any>());
    }

    async sellerMap(items: any[]) {
        const _sellerIds: string[] = items
            .filter((item) => !item.sellersApply.includes('all'))
            .flatMap((item) => item.sellersApply);

        if (!_sellerIds) {
            return new Map<string, any>();
        }

        let searchQuery = {
            _id: { $in: _sellerIds },
            isDeleted: { $ne: true },
        };
        let sellers = await sellerRepository.searchBasic(searchQuery, ['_id', 'name']);
        return sellers.reduce((map, seller) => {
            map.set(seller._id.toString(), seller);
            return map;
        }, new Map<string, any>());
    }

    async getAll(user: any) {
        return await deliveryNumberRepository.searchAll({ ...user.modify });
    }

    async create(requestBody: any, authedUser: any) {
        Object.assign(requestBody, authedUser.modify);
        const payload = await deliveryNumberRepository.mgNewCreate(requestBody, authedUser);
        LogRepos.log(payload, ACTION_LOG.CREATE, TYPE_LOG.DELIVERY_NUMBER);
        return payload;
    }

    async getById(_id: string, authedUser: any) {
        if (!isObjectId(_id)) throw throwApiError(AppRespCodes.INVALID_DATA, 'Id is not an objectId');

        const query = {
            _id,
            ...authedUser.modify,
        };
        return await deliveryNumberRepository.findOne(query);
    }

    async update(_id: string, requestBody: any, authedUser: any) {
        Object.assign(requestBody, { _id }, authedUser.modify);
        return await deliveryNumberRepository.upsert(
            requestBody,
            authedUser,
            ACTION_LOG.UPDATE,
            TYPE_LOG.DELIVERY_NUMBER,
        );
    }

    async delete(_id: string, authedUser: any) {
        return await deliveryNumberRepository.deleteById(_id, authedUser, ACTION_LOG.DELETE, TYPE_LOG.DELIVERY_NUMBER);
    }
}

export const deliveryNumberService = new DeliveryNumberService();
