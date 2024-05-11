import * as exceljs from 'exceljs';

import { isArray, isObjectId, newMgModel, throwApiError, getRespPagination, trimStr, removeViChar } from '../utils';

import { AppRespCodes } from '../constants';
import { ACTIVE_STATUS } from '../enums';

import { ProductEntity } from '../models/mongo';
import { productRepository } from '../repositories';
import { PaginationResp, Product, ProductCreate, ProductSearch, ProductSearchDto, ProductUpdate } from './../models';

export class ProductService {
    constructor() {
        console.log('🚀 init -> service-----> product');
    }

    async create(command: ProductCreate, userInfo: any): Promise<Product | null> {
        const { brandName: bName, sku: productSku, names: productNames, barcode } = command || {};
        const nameList: string[] = productNames?.map((name: any) => name.value) || [];

        const keyword = `${bName ?? ''} ${productSku ?? ''} ${barcode ?? ''} ${nameList.join(' ')}`;
        let newProduct: any = {
            ...command,
            barcode,
            ...userInfo.modify,
            keyword: removeViChar(keyword),
        };
        const savedProduct: any = await productRepository.create(newProduct, userInfo);
        return savedProduct as Product | null;
    }

    async search(command: ProductSearch, userInfo: any): Promise<PaginationResp<ProductSearchDto> | null> {
        const { page, size } = command || {};

        const searchQuery = await this.buildSearchQuery(command, userInfo);
        const total: number | null = await productRepository.count(searchQuery);

        if (!total) {
            return null;
        }

        let items: any[] = await productRepository.search(searchQuery, null, page, size);
        return {
            ...getRespPagination(page, size, total),
            items,
        };
    }

    async buildSearchQuery(command: any, userInfo: any): Promise<any> {
        const { keyword, activeStatus, keywordField, sellerIds, agentIds } = command || {};
        let searchQuery: any = { ...userInfo.modify };

        if (isArray(sellerIds, true)) {
            searchQuery.sellerOrgId = { $in: sellerIds };
        }
        if (isArray(agentIds, true)) {
            searchQuery.agentOrgId = { $in: agentIds };
        }

        if (keyword) {
            const keywordRegex = new RegExp(keyword, 'i');
            if (keywordField) {
                searchQuery[keywordField] = keywordRegex;
            } else {
                searchQuery.keyword = keywordRegex;
            }
        }

        if (isArray(activeStatus, true)) {
            searchQuery.activeStatus = { $in: activeStatus };
        }

        return searchQuery;
    }

    async getById(id: string, userInfo: any): Promise<Product | null> {
        if (!isObjectId(id)) {
            throw throwApiError(AppRespCodes.INVALID_DATA, 'Id is not an objectId');
        }

        const product: any = await productRepository.findByIdAndUserInfo(id, userInfo);
        if (product == null) {
            return null;
        }
        return product as Product;
    }

    async update(command: ProductUpdate, userInfo: any): Promise<Product | null> {
        const _id: string = command?._id || '';
        let existingProduct = await productRepository.findByIdAndUserInfo(_id, userInfo);

        if (!existingProduct) {
            throw throwApiError(AppRespCodes.PRODUCT_NOT_FOUND, 'Product not found');
        }

        Object.assign(existingProduct, command);
        existingProduct.activeStatus = ACTIVE_STATUS.IAC;
        const updateProduct: ProductEntity | null = await productRepository.update(_id, existingProduct, userInfo);
        return updateProduct as Product | null;
    }

    async delete(id: string, userInfo: any): Promise<Boolean | null> {
        if (!isObjectId(id)) {
            throw throwApiError(AppRespCodes.INVALID_DATA, 'Id is not an objectId');
        }
        const existingProduct: any = await productRepository.findByIdAndUserInfo(id, userInfo);
        if (!existingProduct) {
            throw throwApiError(AppRespCodes.PRODUCT_NOT_FOUND, 'Product not found');
        }
        const deletedOne = await productRepository.delete(id, userInfo);
        return deletedOne;
    }

    async insertMany(desiredFile: any, userInfo: any): Promise<any> {
        const data: any[] = [];

        if (desiredFile) {
            const workbook = new exceljs.Workbook();
            await workbook.xlsx.load(desiredFile.buffer);
            const worksheet = workbook.getWorksheet(1);

            if (worksheet) {
                const headerRow = worksheet.getRow(1).values as string[];
                const detailHeader = worksheet.getRow(2).values as string[];

                let isHeaderRow = true;
                let stopProcessing = false;

                worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
                    if (isHeaderRow || stopProcessing || rowNumber === 2) {
                        isHeaderRow = false;
                        return;
                    }

                    const names: any[] = [];
                    let keyword: string = '';
                    const product: ProductCreate = {};
                    detailHeader.forEach((header, index) => {
                        const cellValue = this.getCellValue(row, index);

                        if (headerRow.includes(header)) {
                            product[header] = cellValue;
                        } else {
                            keyword += trimStr(cellValue) + ' ';
                            const name = { lang: header, value: cellValue };
                            names.push(name);
                        }
                    });

                    const { values } = row;
                    if (!isArray(values, true)) {
                        stopProcessing = true;
                        return;
                    }
                    product.names = names;
                    const { barcode, sku, brandName } = product || {};
                    if (barcode || sku || brandName) {
                        keyword += (barcode || '') + ' ' + (sku || '') + ' ' + (brandName || '');
                    }
                    product.keyword = removeViChar(keyword);
                    data.push(newMgModel({ ...product, ...userInfo.modify }, userInfo));
                });
            }
        }
        const insertedProducts: ProductEntity[] | null = await productRepository.insertMany(data);
        return insertedProducts;
    }

    getCellValue = (row: exceljs.Row, cellIndex: number) => {
        const cell = row.getCell(cellIndex);
        return cell.value ? cell.value.toString() : '';
    };

    async getByNameOrCreate(name: string, userInfo: any, command: ProductCreate): Promise<Product | null> {
        try {
            const product: any = await productRepository.findByName(name, userInfo);
            if (product) {
                return product;
            }
            const { brand, sku, barcode, link, hscode, photoUrl, unitPrice, currencyUnit } = command || {};

            const keyword = `${brand ?? ''} ${sku ?? ''} ${barcode ?? ''} ${name ?? ''}`;
            let newProduct: any = {
                ...userInfo.modify,
                sku,
                brandName: brand,
                photoUrl,
                link,
                salePrice: unitPrice,
                currencyUnit,
                names: [{ lang: 'en', value: name }],
                hscode,
                keyword: removeViChar(keyword),
            };
            const savedProduct: any = await productRepository.create(newProduct, userInfo);
            return savedProduct as Product;
        } catch (error) {
            console.log('error: getByNameOrCreate', error);
        }
        return null;
    }
}

export const productService = new ProductService();
