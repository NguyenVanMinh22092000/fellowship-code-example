import { SellerEntity, MgSeller } from '../models/mongo';
import { GenericRepository } from './generic.repository';

export class SellerRepository extends GenericRepository<SellerEntity> {
    constructor() {
        console.log('🚀 init -> repository -> seller');
        super(MgSeller);
    }
}
export const sellerRepository = new SellerRepository();
