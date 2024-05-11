import { GHNCodeSearchByName } from '../models';
import { GhnCodeEntity, MgGhnCode } from '../models/mongo';
import { isArray } from '../utils';
import { GenericRepository } from './generic.repository';

export class GhnCodeRepository extends GenericRepository<GhnCodeEntity> {
    constructor() {
        console.log('🚀 init -> repository -> ghn code');
        super(MgGhnCode);
    }

    async findByCode(code: string, level: number): Promise<any> {
        const query = { code, level, isDeleted: false };
        return MgGhnCode.findOne(query as any).exec();
    }

    async getGhnCodeByName(body: GHNCodeSearchByName): Promise<string> {
        try {
            const { name, countryCode, level, parentCode } = body || {};
            const searchQuery: any = {};
            searchQuery.countryCode = countryCode;
            searchQuery.level = level;
            searchQuery.nameRepresent = {
                $elemMatch: {
                    $regex: name,
                    $options: 'i',
                },
            };

            if (parentCode) {
                searchQuery.parentCode = parentCode;
            }

            const result = await MgGhnCode.find(searchQuery).sort({}).exec();
            if (isArray(result, true)) {
                return result[0].code;
            }
        } catch (error) {
            console.log('Error: searchByName ->', error);
        }
        return '';
    }

    async getGhnCodehByName(body: GHNCodeSearchByName): Promise<any> {
        try {
            const { name, countryCode, level, parentCode } = body || {};
            const searchQuery: any = {};
            searchQuery.countryCode = countryCode;
            searchQuery.level = level;
            searchQuery.nameRepresent = {
                $elemMatch: {
                    $regex: name,
                    $options: 'i',
                },
            };

            if (parentCode) {
                searchQuery.parentCode = parentCode;
            }

            const result = await MgGhnCode.find(searchQuery).sort({}).exec();
            if (isArray(result, true)) {
                return result[0];
            }
        } catch (error) {
            console.log('Error: searchByName ->', error);
        }
        return '';
    }
}

export const ghnCodeRepository = new GhnCodeRepository();
