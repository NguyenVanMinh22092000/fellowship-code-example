import { UserEntity, mgUser } from '../models/mongo';
import { GenericRepository } from './generic.repository';

export class UserRepository extends GenericRepository<UserEntity> {
    constructor() {
        console.log('🚀 init -> repository -> user');
        super(mgUser);
    }
}

export const userRepository = new UserRepository();
