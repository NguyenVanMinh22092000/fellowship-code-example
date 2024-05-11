import { LocalShipmentEntity, MgLocalShipment } from '../models/mongo';
import { GenericRepository } from './generic.repository';

export class LocalShipmentRepository extends GenericRepository<LocalShipmentEntity> {
    constructor() {
        console.log('🚀 init -> repository -> local shipment');
        super(MgLocalShipment);
    }
}

export const localShipmentRepository = new LocalShipmentRepository();
