import { DeliveryNumberEntity, MgDeliveryNumber } from '../models/mongo';
import { GenericRepository } from './generic.repository';

export class DeliveryNumberRepository extends GenericRepository<DeliveryNumberEntity> {
    constructor() {
        console.log('🚀 init -> repository -> delivery number');
        super(MgDeliveryNumber);
    }
}

export const deliveryNumberRepository = new DeliveryNumberRepository();
