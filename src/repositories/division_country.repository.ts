import { GenericRepository } from './generic.repository';
import { DivisionCountryEntity, MgDivisionCountry } from '../models/mongo';

export class DivisionCountryRepository extends GenericRepository<DivisionCountryEntity> {
    constructor() {
        console.log('🚀 init -> repository -> division country');
        super(MgDivisionCountry);
    }
}

export const divisionCountryRepository = new DivisionCountryRepository();
