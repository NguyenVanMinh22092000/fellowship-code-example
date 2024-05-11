import { FilterQuery, UpdateQuery } from 'mongoose';
import { USER_TYPE } from '../enums';
import { MgOrder, OrderEntity } from '../models/mongo/mg.order.model';
import { GenericRepository } from './generic.repository';

export class OrderRepository extends GenericRepository<OrderEntity> {
    constructor() {
        console.log('🚀 init -> repository -> order');
        super(MgOrder);
    }

    async findByIdAndUserInfo(id: string, userInfo: any): Promise<OrderEntity | null> {
        const query: any = { _id: id, isDeleted: false };
        const { type, sellerOrgId, agentOrgId } = userInfo || {};
        if (type === USER_TYPE.AGENT) {
            query.agentOrgId = agentOrgId;
        }

        if (type === USER_TYPE.SELLER) {
            query.sellerOrgId = sellerOrgId;
        }
        return MgOrder.findOne(query as any).exec();
    }

    async findByDeliveryCode(deliveryCode: string): Promise<OrderEntity | null> {
        const query: any = { deliveryCode, isDeleted: false };
        return MgOrder.findOne(query as any).exec();
    }

    async updateMany(condition: FilterQuery<OrderEntity>, updateFields: UpdateQuery<OrderEntity>): Promise<boolean> {
        const updatedQuery = { ...condition, isDeleted: false };
        const result = await MgOrder.updateMany(updatedQuery, { $set: updateFields }).exec();
        const { modifiedCount } = result || {};
        if (modifiedCount > 0) return true;
        else return false;
    }
}

export const orderRepository = new OrderRepository();
