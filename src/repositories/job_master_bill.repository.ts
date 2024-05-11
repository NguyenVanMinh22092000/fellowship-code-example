import { JobMasterBillEntity, MgJobMasterBill } from '../models/mongo';
import { GenericRepository } from './generic.repository';

export class JobMasterBillRepository extends GenericRepository<JobMasterBillEntity> {
    constructor() {
        console.log('🚀 init -> repository -> job master bill');
        super(MgJobMasterBill);
    }
    async hardDelete(name: string): Promise<number> {
        const result = await MgJobMasterBill.deleteMany({ name });
        return result.deletedCount || 0;
    }

    async findByName(name: string): Promise<any> {
        const query = { name };
        return MgJobMasterBill.findOne(query as any).exec();
    }

    async update(existingDocument: any): Promise<any> {
        const updatedDocument = await existingDocument.save();
        return updatedDocument.toObject();
    }

    async getAll(sort?: any): Promise<any> {
        const query = {};
        let _sort: any = { ...sort };
        if (!sort) {
            _sort = { createdDate: -1 };
        }
        return MgJobMasterBill.find(query as any)
            .sort(_sort)
            .exec();
    }
}

export const jobMasterBillRepository = new JobMasterBillRepository();
