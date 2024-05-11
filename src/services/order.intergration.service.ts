import { ConfigEntry } from './../models/mongo/mg.config.model';
import { configService } from './config.service';
import axios, { AxiosRequestConfig } from 'axios';
import { API_METHOD, GHN_CODE, GHN_CONFIG, LABEL_SIZE, REQUIRED_NOTE, SHOP_ADDRESS, SIZE_MAPPING } from '../enums';

import { HEADER } from './../models/common.model';
import { GHNResponse, OrderGHNGetDetail, OrderGetFeeGHN } from './../models/order.intergration.model';
import { OrderCreate, OrderGHN, OrderGHNCalculateFee, OrderUpdateGHN } from '../models';
import { ghnCodeRepository } from '../repositories';
import { OrderEntity } from '../models/mongo';

export const getGHNHeader = async (): Promise<any> => {
    const ghnConfig: ConfigEntry | null = await configService.getShippingCompanyById('GHN');
    if (ghnConfig) {
        const { token, shopId } = ghnConfig.data || {};
        return { ...HEADER, shopId, Token: token };
    }
};

export const getGHNDomain = async (): Promise<any> => {
    const ghnConfig: ConfigEntry | null = await configService.getShippingCompanyById('GHN');
    if (ghnConfig) {
        const { domain } = ghnConfig.data || {};
        return domain;
    }
};

export const getGHNConfig = async (): Promise<any> => {
    const ghnConfig: ConfigEntry | null = await configService.getShippingCompanyById('GHN');
    if (ghnConfig) {
        const { domain, token, shopId } = ghnConfig.data || {};
        const header: any = { ...HEADER, shopId, Token: token };
        return { domain, header };
    }
};

export class OrderIntergrationService {
    constructor() {
        console.log('🚀 init -> service-----> order intergration');
    }
    async genToken(ghnId: string, size: string): Promise<any> {
        const { domain, header } = (await getGHNConfig()) || {};
        const config: AxiosRequestConfig = {
            method: API_METHOD.POST,
            url: domain + GHN_CONFIG.GEN_TOKEN,
            headers: header,
            data: { order_codes: [ghnId] },
        };

        const response = await axios(config);

        if (response?.data) {
            const { token } = response.data.data || {};
            if (size === LABEL_SIZE.SMALL) size = SIZE_MAPPING.SMALL;
            if (size === LABEL_SIZE.NORMAL) size = SIZE_MAPPING.NORMAL;
            if (size === LABEL_SIZE.LARGE) size = SIZE_MAPPING.LARGE;
            const result = domain + `${GHN_CONFIG.PRINT_URL}${size}?token=${token}`;
            return result;
        }

        return null;
    }

    async createGHNOrder(order: OrderCreate): Promise<any> {
        const { sender, products, receiver } = order || {};
        const { domain, header } = (await getGHNConfig()) || {};
        const productName = products.map(({ name }) => name).join(' - ');
        const totalQuantity = products.reduce((total, product) => total + Number(product.quantity), 0);
        const district_id: string = await this.transformCodeToIdForDistrict(order);
        try {
            const body: OrderGHN = {
                to_name: receiver.name,
                from_name: sender.name,
                from_phone: sender.phoneNumber,
                from_address: SHOP_ADDRESS.FULL_ADDRESS,
                from_ward_name: SHOP_ADDRESS.FROM_WARD,
                from_district_name: SHOP_ADDRESS.FROM_DISTRICT,
                from_provice_name: SHOP_ADDRESS.FROM_CITY,
                to_phone: receiver.phoneNumber1,
                to_address: receiver.postalAddress.fullAddress,
                to_ward_code: receiver.postalAddress.buildingName,
                to_district_id: +district_id,
                weight: order.weight,
                length: order.length,
                width: order.width,
                height: order.height,
                service_type_id: GHN_CONFIG.SERVICE_TYPE_ID,
                service_id: GHN_CONFIG.SERVICE_ID,
                payment_type_id: GHN_CONFIG.PAYMENT_TYPE_ID,
                required_note: REQUIRED_NOTE.CHOXEMHANGKHONGTHU,
                Items: products,
                name: productName,
                quantity: totalQuantity,
                pick_station_id: GHN_CONFIG.PICK_STATION_ID,
            };
            const config: AxiosRequestConfig = {
                method: API_METHOD.POST,
                url: domain + GHN_CONFIG.CREATE_URL,
                headers: header,
                data: body,
            };

            const response = await axios(config);
            return response;
        } catch (error) {
            if (error?.response) {
                console.error('Error calling GHN API. Status:', error.response?.status);
                console.error('Response data:', error.response?.data);
                return error.response;
            } else {
                console.error('Error calling GHN API:', error.message);
                return error;
            }
        }
    }

    async cancelOrder(ghnId: string) {
        try {
            const { domain, header } = (await getGHNConfig()) || {};
            const config: AxiosRequestConfig = {
                method: API_METHOD.POST,
                url: domain + GHN_CONFIG.CANCEL_URL,
                headers: header,
                data: { order_codes: [ghnId] },
            };

            const response = await axios(config);
            if (response) {
                return response;
            }
        } catch (error) {
            console.log('Error cancelOrder -> ', error);
            return null;
        }
    }

    async transformCodeToIdForDistrict(order: any): Promise<string> {
        const { receiver } = order || {};
        const { postalAddress } = receiver || {};
        const { county } = postalAddress || {};
        const district = await ghnCodeRepository.findByCode(county, 2);
        const { id } = district || {};
        return id || '';
    }

    async calculateFee(order: OrderCreate): Promise<any> {
        const { receiver } = order || {};
        const { domain, header } = (await getGHNConfig()) || {};
        const district_id: string = await this.transformCodeToIdForDistrict(order);
        const body: OrderGHNCalculateFee = {
            from_district_id: SHOP_ADDRESS.FROM_DISTRICT_ID,
            from_ward_code: SHOP_ADDRESS.FROM_WARD_CODE,
            service_type_id: GHN_CONFIG.SERVICE_TYPE_ID,
            service_id: GHN_CONFIG.SERVICE_ID,
            to_district_id: +district_id,
            to_ward_code: receiver.postalAddress.buildingName,
            height: order.height,
            length: order.length,
            weight: order.weight,
            width: order.width,
        };

        const config: AxiosRequestConfig = {
            method: API_METHOD.POST,
            url: domain + GHN_CONFIG.CALCULATE_FEE,
            headers: header,
            data: body,
        };

        const response = await axios(config);

        if (response?.data) {
            return response.data;
        }
        return null;
    }

    async getDetail(ghnId: string): Promise<any> {
        const { domain, header } = (await getGHNConfig()) || {};
        const config: AxiosRequestConfig = {
            method: API_METHOD.POST,
            url: domain + GHN_CONFIG.GET_DETAIL,
            headers: header,
            data: { order_code: ghnId },
        };
        const response = await axios(config);
        if (response?.data) {
            return response.data;
        }
        return null;
    }

    async getDetailV2(ghnId: string): Promise<OrderGHNGetDetail | null> {
        const { domain, header } = (await getGHNConfig()) || {};
        const config: AxiosRequestConfig = {
            method: API_METHOD.POST,
            url: domain + GHN_CONFIG.GET_DETAIL,
            headers: header,
            data: { order_code: ghnId },
        };
        const response = await axios(config);
        if (response) {
            const apiResult: GHNResponse = response.data || {};
            const { code, data } = apiResult || {};
            if (code === GHN_CODE.SUCCESS) {
                const result: OrderGHNGetDetail = data || {};
                return result;
            }
        }
        return null;
    }

    async updateGHNOrder(order: OrderEntity): Promise<any> {
        const { domain, header } = (await getGHNConfig()) || {};
        const { deliveryCode, sender, receiver, products } = order || {};
        const productName: string = products.map(({ name }) => name).join(' - ');
        const totalQuantity: number = products.reduce((total, product) => total + Number(product.quantity), 0);
        const district_id: string = await this.transformCodeToIdForDistrict(order);
        try {
            const body: OrderUpdateGHN = {
                order_code: deliveryCode,
                to_name: receiver.name,
                from_name: sender.name,
                from_phone: sender.phoneNumber,
                from_address: SHOP_ADDRESS.FULL_ADDRESS,
                from_ward_name: SHOP_ADDRESS.FROM_WARD,
                from_district_name: SHOP_ADDRESS.FROM_DISTRICT,
                from_provice_name: SHOP_ADDRESS.FROM_CITY,
                to_phone: receiver.phoneNumber1,
                to_address: receiver.postalAddress.fullAddress,
                to_ward_code: receiver.postalAddress.buildingName,
                to_district_id: +district_id,
                weight: order.weight,
                length: order.length,
                width: order.width,
                height: order.height,
                service_type_id: GHN_CONFIG.SERVICE_TYPE_ID,
                service_id: GHN_CONFIG.SERVICE_ID,
                payment_type_id: GHN_CONFIG.PAYMENT_TYPE_ID,
                required_note: REQUIRED_NOTE.CHOXEMHANGKHONGTHU,
                Items: products,
                name: productName,
                quantity: totalQuantity,
                pick_station_id: GHN_CONFIG.PICK_STATION_ID,
            };

            const config: AxiosRequestConfig = {
                method: API_METHOD.POST,
                url: domain + GHN_CONFIG.UPDATE_ORDER,
                headers: header,
                data: body,
            };

            const response = await axios(config);
            return response;
        } catch (error) {
            if (error?.response) {
                console.error('Error calling GHN API. Status:', error?.response?.status);
                console.error('Response data:', error.response?.data);
                return error.response;
            } else {
                console.error('Error calling GHN API:', error?.message);
                return error;
            }
        }
    }

    async getFee(ghnId: string): Promise<number | null> {
        const { domain, header } = (await getGHNConfig()) || {};
        const config: AxiosRequestConfig = {
            method: API_METHOD.POST,
            url: domain + GHN_CONFIG.GET_ORDER_FEE,
            headers: header,
            data: { order_code: ghnId },
        };

        try {
            const response = await axios(config);
            const { data } = response?.data ?? {};
            if (response?.data?.code === GHN_CODE.SUCCESS) {
                const result: OrderGetFeeGHN = data;
                const fee = result?.detail?.main_service ?? 0;
                return fee;
            }
        } catch (error) {
            console.error('Error occurred while fetching fee:', error);
        }

        return null;
    }
}

export const orderIntergrationService = new OrderIntergrationService();
