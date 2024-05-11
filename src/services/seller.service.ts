import { AppRespCodes } from '../constants';

import { throwApiError } from '../utils/api.util';
import { isObjectId, getRespPagination, getMgKeywordQuery } from '../utils';

import { LogRepos, sellerRepository } from '../repositories';

import { SellerCreate, SellerSearch } from '../models';

import { ACTION_LOG, TYPE_LOG } from '../enums';
import { SellerEntity } from '../models/mongo';

export class SellerService {
    constructor() {
        console.log('🚀 init -> service-----> seller');
    }

    async search(requestBody: SellerSearch, authedUser: any) {
        const { page, size, keyword, agentOrgId } = requestBody || {};
        let query = {
            ...authedUser.modify,
            $and: [{ isDeleted: false }],
        };
        if (keyword) {
            query.$and.push({ $or: getMgKeywordQuery(keyword, 'name address') });
        }
        if (agentOrgId) {
            query.$and.push({ _id: agentOrgId });
        }

        let total = await sellerRepository.count(query);
        if (!total) return null;

        let items = await sellerRepository.searchPage(query, [], { createdDate: -1 }, page, size);
        return {
            ...getRespPagination(page, size, total),
            items,
        };
    }

    async getAll(user: any) {
        return await sellerRepository.searchAll({ ...user.modify });
    }

    async create(requestBody: SellerCreate, authedUser: any) {
        const { agentOrgId, code } = requestBody || {};

        if (!agentOrgId) {
            throw throwApiError(AppRespCodes.INVALID_DATA, 'agentOrgId is not found');
        }
        let existedSeller = await sellerRepository.findOne({ code });
        if (existedSeller) {
            throw throwApiError(AppRespCodes.SELLER_EXISTED, 'seller exited');
        }

        // create seller
        Object.assign(requestBody, authedUser.modify);
        const savedSeller: any = await sellerRepository.mgNewCreate(requestBody as any, authedUser);

        // assign agentOrgId - permission
        Object.assign(savedSeller, {
            sellerOrgId: savedSeller._id.toString(),
        });
        let payload = await sellerRepository.mgUpsert(savedSeller, authedUser);

        LogRepos.log(payload, ACTION_LOG.CREATE, TYPE_LOG.SELLER);
        return payload as any;
    }

    async getById(_id: string, authedUser: any) {
        if (!isObjectId(_id)) {
            throw throwApiError(AppRespCodes.INVALID_DATA, 'Id is not an objectId');
        }
        const query = {
            _id: _id,
            isDeleted: false,
            ...authedUser.modify,
        };
        return await sellerRepository.findOne(query);
    }

    async update(_id: string, requestBody: any, authedUser: any) {
        Object.assign(requestBody, { _id }, authedUser.modify);
        return await sellerRepository.upsert(requestBody, authedUser, ACTION_LOG.UPDATE, TYPE_LOG.SELLER);
    }

    async delete(id: string, authedUser: any) {
        return await sellerRepository.deleteById(id, authedUser, ACTION_LOG.DELETE, TYPE_LOG.SELLER);
    }

    async getByIds(ids: string[]): Promise<SellerEntity[] | null> {
        const query = {
            _id: { $in: ids },
        };
        return await sellerRepository.searchAllSorted(query);
    }
}

export const sellerService = new SellerService();
