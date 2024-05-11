import { cellStyling } from './../utils/excel.util';
import * as exceljs from 'exceljs';

import { orderIntergrationService } from './order.intergration.service';
import { customerService } from './customer.service';
import { productService } from './product.service';
import { sellerService } from './seller.service';
import { jobService } from './job.service';
import { currencyExchangeService } from './currency_exchange.service';

import { countryRepository, ghnCodeRepository, orderRepository } from '../repositories';

import { FILE_STORAGE, genSessionId, isArray, removeViChar } from '../utils';
import { throwApiError } from './../utils/api.util';

import { AppRespCodes } from '../constants';

import {
    COLOR,
    GHN_CODE,
    JOB_NAMES,
    JOB_SERVICES,
    JOB_TYPES,
    ORDER_STATUS,
    PROCESSING_STATUS,
    TIME_ENUM,
} from '../enums';
import { TRANSPORT_TYPE } from './../enums/masterbill.enum';

import { CountryEntity } from '../models/mongo';
import { GHNCodeSearchByName, Processing, fieldImportMappings, IMPORT_TYPE, GHNResponse, JobData } from '../models';
import { formatOrderKeyword, formatStt } from '../utils/order.util';
import { ordinalNumberService } from './ordinal_number.service';

export class OrderService {
    constructor() {
        console.log('🚀 init -> service-----> order');
    }

    calculateTotal(products: any[]): number {
        return products.reduce((acc, { unitPrice, quantity }) => acc + unitPrice * quantity, 0);
    }

    calculateVolumbetricWeight(weight: number, height: number, length: number): number {
        return (weight * height * length) / 6000;
    }

    getCellValue = (row: exceljs.Row, cellIndex: number) => {
        const cell = row.getCell(cellIndex);
        return cell.value ? cell.value.toString() : '';
    };

    async handleAddress(searchAddressCommand: GHNCodeSearchByName) {
        return await ghnCodeRepository.getGhnCodeByName(searchAddressCommand);
    }

    /*
     * Function:  Order Import
     * Step 1: Read the Excel file.
     * Step 2.1: Create a PROCESSING Job and return the sessionId.
     * Step 2.2: Insert the data without awaiting and remove the job.
     */
    async handleImportFile(
        desiredFile: any,
        authedUser: any,
        deliveryProvider: string,
        agentOrgId: string,
        sellerOrgId: string,
    ): Promise<any> {
        const excelFileName: string = `OrderImportError_${Date.now()}.xlsx`;
        const excelFilePath: string = `${FILE_STORAGE}/${excelFileName}`;

        const countries: CountryEntity[] = await countryRepository.getAll();
        const countryCodes: string[] = countries.map((el) => {
            return el.countryCode;
        });

        if (!isArray(countryCodes, true)) {
            throw throwApiError(AppRespCodes.CANNOT_FIND_COUNTRY_LIST, 'Please check country list!');
        }

        const currencyUnits: string[] = countries.map((el) => {
            return el.currencyUnit ?? '';
        });

        if (!isArray(currencyUnits, true)) {
            throw throwApiError(AppRespCodes.CANNOT_FIND_CURRENCY_LIST, 'Please check country list!');
        }

        const sessionId: string = genSessionId();

        let orders: any[] = [];
        let hasError: boolean = false;

        // 1. Read the Excel file
        if (desiredFile) {
            const workbook = new exceljs.Workbook();
            await workbook.xlsx.load(desiredFile.buffer);
            const worksheet = workbook.getWorksheet(1);
            // Lặp qua từng hàng trong cột A và tô màu cho các ô trống
            const newErrorColumn: string = 'Errors';

            if (worksheet) {
                const headerRow: string[] = worksheet.getRow(1).values as string[];
                const lastColumn: number = headerRow.length;
                let isHeaderRow = true;
                let stopProcessing = false;
                let previousOrderNo1: string;
                let errorRow = worksheet.findRow(1);
                if (errorRow) {
                    errorRow.getCell(lastColumn).value = newErrorColumn;
                    let errorCell = errorRow.getCell(lastColumn);
                    worksheet.getCell(errorCell.address).style = cellStyling(COLOR.PINK);
                    worksheet.getColumn(lastColumn).width = 100;
                    errorRow.commit();
                }

                worksheet.eachRow({ includeEmpty: true }, (row) => {
                    if (isHeaderRow || stopProcessing) {
                        isHeaderRow = false;
                        return;
                    }

                    const values = row.values as string[];
                    if (!isArray(values, true)) {
                        stopProcessing = true;
                        return;
                    }

                    const dataObjects: any = {
                        order: {},
                        sender: {},
                        receiver: {},
                        postalAddress: {},
                        product: {},
                    };

                    let mappingHeader = fieldImportMappings.reduce((map, mapping) => {
                        map.set(mapping.header, mapping);
                        return map;
                    }, new Map<string, any>());

                    let validFields = Array.from(mappingHeader.keys());

                    headerRow.forEach((header, index) => {
                        if (!validFields.includes(header)) {
                            throw throwApiError(AppRespCodes.INVALID_PARAM, 'File does not match!');
                        }
                        let cellValue: any = this.getCellValue(row, index);
                        const mapping = mappingHeader.get(header);
                        if (!mapping) {
                            this.addErrorToRow(row, `${header} is invalid name`, lastColumn);
                            return;
                        }

                        if (mapping) {
                            const cell = row.getCell(index);
                            const { target, targetObject, type, isRequired } = mapping || {};
                            if (isRequired && !cellValue) {
                                this.addErrorToRow(row, `${header} is required`, lastColumn);
                                worksheet.getCell(cell.address).style = cellStyling(COLOR.PINK);
                                hasError = true;
                                return;
                            }

                            if (type) {
                                switch (type) {
                                    case IMPORT_TYPE.NUMBER:
                                        cellValue = +cellValue;
                                        if (isNaN(cellValue)) {
                                            this.addErrorToRow(row, `${header} must be a ${type}`, lastColumn);
                                            worksheet.getCell(cell.address).style = cellStyling(COLOR.PINK);
                                            hasError = true;
                                            return;
                                        }
                                        break;
                                    case IMPORT_TYPE.TRANSPORT_TYPE:
                                        if (!(cellValue in TRANSPORT_TYPE)) {
                                            this.addErrorToRow(
                                                row,
                                                `${header} must be ${TRANSPORT_TYPE.AIR} or ${TRANSPORT_TYPE.SEA}`,
                                                lastColumn,
                                            );
                                            worksheet.getCell(cell.address).style = cellStyling(COLOR.PINK);
                                            hasError = true;
                                            return;
                                        }
                                        break;
                                    case IMPORT_TYPE.COUNTRY_CODE:
                                        if (!countryCodes.includes(cellValue)) {
                                            this.addErrorToRow(
                                                row,
                                                `${header} must be in ${countryCodes.join(',')}`,
                                                lastColumn,
                                            );
                                            worksheet.getCell(cell.address).style = cellStyling(COLOR.PINK);
                                            hasError = true;
                                            return;
                                        }
                                        break;
                                    case IMPORT_TYPE.CURRENCY_UNIT:
                                        if (!currencyUnits.includes(cellValue)) {
                                            this.addErrorToRow(
                                                row,
                                                `${header} must be in ${currencyUnits.join(',')}`,
                                                lastColumn,
                                            );
                                            worksheet.getCell(cell.address).style = cellStyling(COLOR.PINK);
                                            hasError = true;
                                            return;
                                        }
                                        break;
                                    case IMPORT_TYPE.PHONE_NUMBER:
                                        if (isNaN(+cellValue)) {
                                            this.addErrorToRow(row, `${header} must be a ${type} type`, lastColumn);
                                            worksheet.getCell(cell.address).style = cellStyling(COLOR.PINK);
                                            hasError = true;
                                            return;
                                        }
                                        break;
                                    default:
                                        break;
                                }
                            }
                            dataObjects[targetObject][target] = cellValue;
                        }
                    });
                    if (dataObjects.order.orderNo01) {
                        if (dataObjects.order.orderNo01 !== previousOrderNo1) {
                            const { order, receiver, postalAddress, product, sender } = dataObjects || {};
                            if (deliveryProvider) order.deliveryProvider = deliveryProvider;
                            receiver.postalAddress = postalAddress;
                            receiver.shippingCountryCode = postalAddress?.countryCode;
                            order.receiver = receiver;
                            order.sender = sender;
                            order.orderStatus = ORDER_STATUS.SUSPENDED;
                            order.products = [product];
                            orders.push(order);
                            previousOrderNo1 = order.orderNo01;
                        } else {
                            const lastIndex = orders.length - 1;
                            orders[lastIndex].products.push(dataObjects.product);
                        }
                    }
                });

                orders.forEach((el) => {
                    const { products, weight, length, height } = el || {};
                    el.totalAmount = this.calculateTotal(products);
                    el.volumetricWeight = this.calculateVolumbetricWeight(weight, length, height);
                });
            }
            if (hasError) {
                await workbook.xlsx.writeFile(excelFilePath);
                const datas: Processing = { status: PROCESSING_STATUS.ERROR, fileName: excelFileName };
                const jobData: JobData = {
                    data: datas,
                    service: JOB_SERVICES.ORDER,
                    type: JOB_TYPES.IMPORT_ERROR,
                    sessionId,
                };
                jobService.add(JOB_NAMES.PROCESSING, +new Date() + TIME_ENUM.THIRTY_SECONDS, jobData);
                return sessionId;
            }
        }

        const datas: Processing = { status: PROCESSING_STATUS.PROCESSING };
        const jobData: JobData = {
            data: datas,
            service: JOB_SERVICES.ORDER,
            type: JOB_TYPES.IMPORT,
            sessionId,
        };
        // 2.1. Create a PROCESSING Job.
        jobService.add(JOB_NAMES.PROCESSING, +new Date() + TIME_ENUM.TEN_MINUTES, jobData);
        // 2.2. Insert the data without awaiting and remove the job
        // set seller info
        if (agentOrgId) {
            authedUser.agentOrgId = agentOrgId;
            authedUser.modify.agentOrgId = agentOrgId;
        }
        if (sellerOrgId) {
            authedUser.sellerOrgId = sellerOrgId;
            authedUser.modify.sellerOrgId = sellerOrgId;
        }
        this.createOrderList(orders, authedUser, sessionId);
        // 2.1 return the sessionId
        return sessionId;
    }

    addErrorToRow = (row: exceljs.Row, error: string, errorRow: number) => {
        const cell = row.getCell(errorRow);
        const currentValue = cell.value;
        if (currentValue) {
            cell.value = `${currentValue}; ${error}`;
        } else {
            cell.value = error;
        }
    };

    async createOrderList(orders: any[], authedUser: any, sessionId: string): Promise<any> {
        try {
            let code = await this.getSellerCode(authedUser);

            if (isArray(orders, true)) {
                let successfulTotal = 0;
                for (const el of orders) {
                    if (!el) break;
                    const { receiver, products, currencyUnit } = el || {};
                    const { postalAddress } = receiver || {};

                    if (postalAddress.countryCode === 'VN') {
                        const citySearch: GHNCodeSearchByName = {
                            level: 1,
                            parentCode: receiver.postalAddress.countryCode,
                            countryCode: receiver.postalAddress.countryCode,
                            name: receiver.postalAddress.stateOrProvinceText,
                        };

                        const province = await ghnCodeRepository.getGhnCodehByName(citySearch);
                        const { code: stateCode, postalCode } = province || {};
                        if (postalCode) {
                            postalAddress.postalCode = postalCode;
                        }

                        const countySearch: GHNCodeSearchByName = {
                            level: 2,
                            parentCode: stateCode,
                            name: postalAddress.countyText,
                            countryCode: postalAddress.countryCode,
                        };
                        const countyCode: string = await this.handleAddress(countySearch);

                        const wardSearch: GHNCodeSearchByName = {
                            level: 3,
                            parentCode: countyCode,
                            name: postalAddress.buildingNameText,
                            countryCode: postalAddress.countryCode,
                        };
                        const wardCode: string = await this.handleAddress(wardSearch);
                        if (wardCode) {
                            postalAddress.county = countyCode;
                            postalAddress.buildingName = wardCode;
                            postalAddress.stateOrProvince = stateCode;
                            receiver.postalAddress = postalAddress;

                            el.receiver = receiver;

                            const deliverResult = await orderIntergrationService.createGHNOrder(el);
                            const returnData: GHNResponse = deliverResult.data || {};
                            if (returnData) {
                                const { code, data } = returnData;

                                if (!code || code !== GHN_CODE.SUCCESS) {
                                    el.deliverService = returnData;
                                    el.orderStatus = ORDER_STATUS.SUSPENDED;
                                } else {
                                    el.deliverService = data;
                                    el.deliveryFee = await currencyExchangeService.changeCurrency(data.total_fee);
                                    el.deliveryCode = data.order_code;
                                    el.orderStatus = ORDER_STATUS.READY_FOR_WAREHOUSING;
                                }
                            }
                        }
                    }

                    if (receiver.phoneNumber1) {
                        const customer = {
                            phoneNumber1: receiver.phoneNumber1,
                            phoneNumber2: receiver.phoneNumber2,
                            fullName: receiver.name,
                            customerRefNo: receiver.customerRefNo,
                            email: receiver.email,
                            postalAddress,
                        };
                        const newCustomer: any = await customerService.getOrCreate(customer, authedUser);
                        if (newCustomer?._id) {
                            receiver.customerId = newCustomer._id.toString();
                        }
                    }

                    if (isArray(products, true)) {
                        const newProducts: any[] = [];
                        for (const product of products) {
                            const { name } = product || {};
                            const addProduct: any = { ...product, currencyUnit };

                            const existingProduct: any = await productService.getByNameOrCreate(
                                name,
                                authedUser,
                                addProduct,
                            );
                            const { _id } = existingProduct || {};
                            if (_id) {
                                product.productId = _id.toString();
                            }
                            newProducts.push(product);
                        }
                        el.products = newProducts;
                    }

                    const { currentYear, ordinalNumber }: any = await ordinalNumberService.orderIncrease();
                    const registrationNumber: string = code + currentYear + formatStt(ordinalNumber);
                    const keywordParts = [
                        receiver.phoneNumber1,
                        registrationNumber,
                        receiver.postalAddress?.fullAddress,
                        receiver.fullName,
                        receiver.name,
                        el.orderNo01,
                        el?.deliveryCode,
                    ];

                    el.keyword = formatOrderKeyword(keywordParts);
                    el.receiverNameKeyword = removeViChar(receiver.name);
                    el.receiverAddressKeyword = removeViChar(receiver.postalAddress.fullAddress);
                    el.registrationNumber = registrationNumber;
                    el.agentOrgId = authedUser.agentOrgId;
                    el.sellerOrgId = authedUser.sellerOrgId;
                    const order = await orderRepository.create(el, authedUser);
                    if (order) {
                        successfulTotal++;
                    }
                }
                const datas: any = {
                    status: PROCESSING_STATUS.DONE,
                    total: orders.length,
                    successfulTotal,
                };
                jobService.update(sessionId, datas, +new Date() + TIME_ENUM.FIVE_SECONDS);
            }
        } catch (error) {
            const jobData: Processing = {
                status: PROCESSING_STATUS.ERROR,
                error,
            };
            jobService.update(sessionId, jobData, +new Date() + TIME_ENUM.THIRTY_SECONDS);
        }
    }

    async getSellerCode(authedUser: any) {
        return (await sellerService.getById(authedUser.sellerOrgId, authedUser))?.code;
    }

    async getSessionInfoById(sessionId: string) {
        return await jobService.get(sessionId, 'data');
    }
}

export const orderService = new OrderService();
