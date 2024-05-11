import { GenericRepository } from './generic.repository';
import { ConfigEntry, MgConfigEntry } from '../models/mongo';
import { FilterQuery } from 'mongoose';

export class ConfigRepository extends GenericRepository<ConfigEntry> {
    constructor() {
        console.log('🚀 init -> repository -> config');
        super(MgConfigEntry);
    }

    async findOne(query: FilterQuery<any>): Promise<ConfigEntry | null> {
        query = { isDeleted: false, ...query };
        return MgConfigEntry.findOne(query).exec();
    }
}
export const configRepository = new ConfigRepository();
