import { MgProduct, ProductEntity } from '../models/mongo';
import { GenericRepository } from './generic.repository';

export class ProductRepository extends GenericRepository<ProductEntity> {
    constructor() {
        console.log('🚀 init -> repository -> product');
        super(MgProduct);
    }

    async findByIdAndUserInfo(id: string, userInfo: any): Promise<any> {
        const query: any = { _id: id, isDeleted: false };
        return MgProduct.findOne({ ...query, ...userInfo.modify } as any).exec();
    }

    async findByName(name: string, userInfo: any): Promise<any> {
        const query: any = {
            $and: [{ 'names.lang': 'en' }, { 'names.value': name }, { isDeleted: false }],
        };
        return MgProduct.findOne({ ...query, ...userInfo.modify }).exec();
    }
}

export const productRepository = new ProductRepository();
