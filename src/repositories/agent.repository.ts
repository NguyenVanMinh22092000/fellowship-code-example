import { AgentEntity, MgAgent } from '../models/mongo';
import { GenericRepository } from './generic.repository';

export class AgentRepository extends GenericRepository<AgentEntity> {
    constructor() {
        console.log('🚀 init -> repository -> agent');
        super(MgAgent);
    }
}

export const agentRepository = new AgentRepository();
