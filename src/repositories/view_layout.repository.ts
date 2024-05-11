import { MgViewLayout, ViewLayoutEntity } from '../models/mongo';
import { GenericRepository } from './generic.repository';

export class ViewLayoutRepository extends GenericRepository<ViewLayoutEntity> {
    constructor() {
        console.log('🚀 init -> repository -> view layout');
        super(MgViewLayout);
    }
    async getByUserId(id: string) {
        return await MgViewLayout.findOne({ userId: id, isDeleted: false }).exec();
    }
}

export const wiewLayoutRepository = new ViewLayoutRepository();
