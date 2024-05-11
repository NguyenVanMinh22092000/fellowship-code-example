import { CustomerEntity, MgCustomer } from '../models/mongo/mg.customer.model';
import { GenericRepository } from './generic.repository';

export class CustomerRepository extends GenericRepository<CustomerEntity> {
    constructor() {
        console.log('🚀 init -> repository -> customer');
        super(MgCustomer);
    }

    async findByPhoneAndSellerId(phoneNumber1: string, sellerOrgId: string) {
        const query = { phoneNumber1, sellerOrgId, isDeleted: false };
        return MgCustomer.findOne(query as any).exec();
    }
}

export const customerRepository = new CustomerRepository();
