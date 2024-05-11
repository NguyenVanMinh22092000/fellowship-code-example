import { MgGHNLog, GHNLogEntity } from '../models/mongo/mg.ghn_log.model';
import { GenericRepository } from './generic.repository';

export class GHNLogRepository extends GenericRepository<GHNLogEntity> {
    constructor() {
        console.log('🚀 init -> repository -> ghn log');
        super(MgGHNLog);
    }
}

export const ghnogRepository = new GHNLogRepository();
