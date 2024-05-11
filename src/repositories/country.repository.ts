import { CountryEntity, MgCountry } from '../models/mongo';
import { GenericRepository } from './generic.repository';

export class CountryRepository extends GenericRepository<CountryEntity> {
    constructor() {
        console.log('🚀 init -> repository -> country');
        super(MgCountry);
    }
}

export const countryRepository = new CountryRepository();
