import { isEmpty } from 'lodash';

import { customerRepository } from '../repositories';

import { getRespPagination, isArray, throwApiError, trimStr } from '../utils';

import { Customer, CustomerCrud, CustomerDeleteManyCommand, CustomerSearchCommand, PaginationResp } from '../models';
import { CustomerEntity } from '../models/mongo';
import { AppRespCodes } from '../constants';

export class CustomerService {
    constructor() {
        console.log('🚀 init -> service-----> customer');
    }

    async search(command: CustomerSearchCommand, token: any): Promise<PaginationResp<Customer> | null> {
        const { page, size } = command || {};
        let searchQuery: any = this.buildQuerySearch(command, token);

        const total: number | null = await customerRepository.count(searchQuery);
        if (!total) return null;

        let items: any[] = await customerRepository.search(searchQuery, null, page, size);
        return {
            ...getRespPagination(page, size, total),
            items,
        };
    }

    buildQuerySearch = (command: CustomerSearchCommand, userInfo: any): any => {
        const { keyword, field, agentOrgIds, sellerOrgIds } = command || {};
        const { sellerOrgId, agentOrgId } = userInfo;
        let query: any = {};

        if (sellerOrgId) query.sellerOrgId = sellerOrgId;

        if (agentOrgId) query.agentOrgId = agentOrgId;

        if (isArray(agentOrgIds, true)) {
            query.agentOrgId = { $in: agentOrgIds };
        }
        if (isArray(sellerOrgIds, true)) {
            query.sellerOrgId = { $in: sellerOrgIds };
        }

        if (trimStr(keyword)) {
            query[field || 'searchText'] = new RegExp(trimStr(keyword), 'i');
        }

        return query;
    };

    async create(command: CustomerCrud, userInfo: any): Promise<Customer | null> {
        const { fullName, phoneNumber1, phoneNumber2, email } = command || {};
        const { modify, sellerOrgId } = userInfo || {};
        const existingCus = await customerRepository.findByPhoneAndSellerId(phoneNumber1, sellerOrgId);
        if (existingCus) {
            throw throwApiError(AppRespCodes.EXISTING_CUSTOMER_PHONE_NUMBER, 'The same phone number!');
        }
        const searchText = `${fullName ?? ''} ${phoneNumber1 ?? ''} ${phoneNumber2 ?? ''} ${email ?? ''}`;
        let datas: any = {
            ...command,
            searchText,
            ...modify,
        };
        const savedData: any = await customerRepository.create(datas, userInfo);
        if (!savedData) return null;
        return savedData as Customer;
    }

    async getOrCreate(command: CustomerCrud, userInfo: any): Promise<CustomerEntity | null> {
        try {
            const { fullName, phoneNumber1, phoneNumber2, email, postalAddress } = command || {};
            const { countryCode } = postalAddress || {};
            const { modify, sellerOrgId } = userInfo || {};
            const existingCus = await customerRepository.findByPhoneAndSellerId(phoneNumber1, sellerOrgId);
            if (existingCus) {
                return existingCus;
            }
            const searchText = `${fullName ?? ''} ${phoneNumber1 ?? ''} ${phoneNumber2 ?? ''} ${email ?? ''}`;
            let datas: any = {
                ...command,
                searchText,
                shippingCountryCode: countryCode,
                ...modify,
            };

            const savedData: any = await customerRepository.create(datas, userInfo);
            if (!savedData) return null;
            return savedData;
        } catch (error) {
            console.log('Error creating Cus: ', error);
        }
        return null;
    }

    async getById(id: string) {
        return await customerRepository.findById(id);
    }

    async update(_id: string, command: CustomerCrud, token: any) {
        const { fullName, phoneNumber1, phoneNumber2, email } = command || {};

        const searchText = `${fullName ?? ''} ${phoneNumber1 ?? ''} ${phoneNumber2 ?? ''} ${email ?? ''}`;
        const datas: any = {
            ...command,
            searchText,
        };
        return await customerRepository.update(_id, datas, token);
    }

    async delete(id: string, token: any) {
        return await customerRepository.delete(id, token);
    }

    async deleteMany(command: CustomerDeleteManyCommand, token: any): Promise<boolean> {
        const { ids, isSelectAll, excludeIds, filter } = command;
        const query: string = isSelectAll ? '$nin' : '$in';
        const searchQuery: any = this.buildQuerySearch(filter!, token);
        const findOpts: any = { _id: { [query]: isSelectAll ? excludeIds : ids } };
        if (!isEmpty(searchQuery)) Object.assign(findOpts, { $and: searchQuery });
        const payload: boolean = await customerRepository.deleteMany(findOpts, token);
        return payload;
    }
}

export const customerService = new CustomerService();
