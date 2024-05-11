import { JobLogEntity, MgJobLog } from '../models/mongo';
import { GenericRepository } from './generic.repository';

export class JobLogRepository extends GenericRepository<JobLogEntity> {
    constructor() {
        console.log('🚀 init -> repository -> job log');
        super(MgJobLog);
    }
}

export const jobLogRepository = new JobLogRepository();
