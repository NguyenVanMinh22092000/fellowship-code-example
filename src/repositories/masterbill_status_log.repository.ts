import { MasterBillStatusLogEntity, MgMasterBillStatusLog } from '../models/mongo';
import { GenericRepository } from './generic.repository';

export class MasterBillStatusLogRepository extends GenericRepository<MasterBillStatusLogEntity> {
    constructor() {
        console.log('🚀 init -> repository -> master bill status log');
        super(MgMasterBillStatusLog);
    }
}

export const masterBillStatusLogRepository = new MasterBillStatusLogRepository();
