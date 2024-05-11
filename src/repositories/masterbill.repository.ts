import { MasterBillEntity, MgMasterBill } from '../models/mongo';
import { GenericRepository } from './generic.repository';

export class MasterbillRepository extends GenericRepository<MasterBillEntity> {
    constructor() {
        console.log('🚀 init -> repository -> master bill');
        super(MgMasterBill);
    }

    async findByIdAndAgentId(id: string, agentOrgId: string): Promise<any> {
        const query = { _id: id, isDeleted: false, agentOrgId };
        return MgMasterBill.findOne(query).exec();
    }

    async findByBillNo(billNo: string): Promise<any> {
        const query = { billNo: billNo, isDeleted: false };
        return MgMasterBill.findOne(query).exec();
    }

    async findByOrderId(orderId: string): Promise<any> {
        const query = { orders: { $in: [orderId] }, isDeleted: false };
        return MgMasterBill.findOne(query).exec();
    }
}

export const masterbillRepository = new MasterbillRepository();
