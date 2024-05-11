import { MgOrdinalNumber, OrdinalNumberEntity } from '../models/mongo';
import { GenericRepository } from './generic.repository';

export class OrdinalNumberRepository extends GenericRepository<OrdinalNumberEntity> {
    constructor() {
        console.log('🚀 init -> repository -> ordinal number');
        super(MgOrdinalNumber);
    }
}

export const ordinalNumberRepository = new OrdinalNumberRepository();
