import { MgOrderLog, OrderLogEntity } from '../models/mongo';
import { GenericRepository } from './generic.repository';

export class OrderLogRepository extends GenericRepository<OrderLogEntity> {
    constructor() {
        console.log('🚀 init -> repository -> order log');
        super(MgOrderLog);
    }
}

export const orderLogRepository = new OrderLogRepository();
