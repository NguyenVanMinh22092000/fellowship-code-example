import { MgTransportCode, TransportCodeEntity } from '../models/mongo';
import { GenericRepository } from './generic.repository';

export class TransportCodeRepository extends GenericRepository<TransportCodeEntity> {
    constructor() {
        console.log('🚀 init -> repository -> transport code');
        super(MgTransportCode);
    }
}

export const transportCodeRepository = new TransportCodeRepository();
