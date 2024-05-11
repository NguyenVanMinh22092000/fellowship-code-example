import { FilterQuery, UpdateQuery } from 'mongoose';
import { MgOrderStatus, OrderStatusEntity } from '../models/mongo';
import { GenericRepository } from './generic.repository';
import { cloneDeep } from 'lodash';
import { newMgModel } from '../utils';

export class OrderStatusRepository extends GenericRepository<OrderStatusEntity> {
    constructor() {
        console.log('🚀 init -> repository -> order status');
        super(MgOrderStatus);
    }

    async push(condition: FilterQuery<any>, pushFields: UpdateQuery<any>): Promise<any> {
        const updatedQuery = { ...condition, isDeleted: false };
        const result = await MgOrderStatus.updateMany(updatedQuery, { $push: pushFields }).exec();
        return result;
    }

    async create(data: any, token: any): Promise<any> {
        try {
            const _data: any = cloneDeep(data || {});
            Object.assign(_data, newMgModel({}, token));
            return MgOrderStatus.create(_data);
        } catch (error) {}
        return null;
    }
}

export const orderStatusRepository = new OrderStatusRepository();
