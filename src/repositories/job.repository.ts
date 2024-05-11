import { GenericRepository } from './generic.repository';

import { JobEntity, MgJob } from '../models/mongo';

export class JobRepository extends GenericRepository<JobEntity> {
    constructor() {
        console.log('🚀 init -> repository -> job');
        super(MgJob);
    }

    async findByName(name: string): Promise<any> {
        const query = { name };
        return MgJob.findOne(query as any).exec();
    }

    async update(existingDocument: any): Promise<any> {
        const updatedDocument = await existingDocument.save();
        return updatedDocument.toObject();
    }

    findOne = async (query: any): Promise<JobEntity | null> => {
        return await MgJob.findOne(query).exec();
    };

    deleteBySessionId = async (sessionId: string): Promise<boolean> => {
        const result = await MgJob.deleteOne({ ['data.sessionId']: sessionId });
        return !!result;
    };
    delete = async (_id: string): Promise<boolean> => {
        const result = await MgJob.deleteOne({ _id });
        return !!result.deletedCount;
    };
}

export const jobRepository = new JobRepository();
