import { ordinalNumberRepository } from '../repositories';

export class OrdinalNumberService {
    constructor() {
        console.log('🚀 init -> service-----> ordinal number');
    }
    async increase(type: string, size: number = 1) {
        const currentYear = new Date().getFullYear();
        let query = { type: type, currentYear: currentYear };
        let updateData = { $inc: { ordinalNumber: size } };
        let returnData = await ordinalNumberRepository.mgFindOneAndUpdateDefault(query, updateData);
        if (!returnData) {
            let newData = {
                currentYear: currentYear,
                ordinalNumber: size,
                type: type,
            } as any;
            return await ordinalNumberRepository.mgNewCreateDefault(newData);
        }
        return returnData;
    }

    async orderIncrease(size: number = 1) {
        return await this.increase('order', size);
    }
}

export const ordinalNumberService = new OrdinalNumberService();
