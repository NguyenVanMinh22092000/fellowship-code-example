import { RoleEntity, MgRole } from '../models/mongo';
import { GenericRepository } from './generic.repository';

export class RoleRepository extends GenericRepository<RoleEntity> {
    constructor() {
        console.log('🚀 init -> repository -> role');
        super(MgRole);
    }
}

export const roleRepository = new RoleRepository();
