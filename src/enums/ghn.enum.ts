import { HEADER } from '../models';
import { ConfigEntry } from '../models/mongo';
import { ConfigService } from '../services';

export enum GHN_STATUS {
    READY_TO_PICK = 'ready_to_pick',
    PICKING = 'picking',
    HOLD = 'cancel',
    MONEY_COLLECT_PICKING = 'money_collect_picking',
    PICKED = 'picked',
    STORING = 'storing',
    TRANSPORTING = 'transporting',
    SORTING = 'sorting',
    DELIVERING = 'delivering',
    MONEY_COLLECT_DELIVERING = 'money_collect_delivering',
    DELIVERED = 'delivered',
    DELIVERY_FAIL = 'delivery_fail',
    WAITING_TO_RETURN = 'waiting_to_return',
    RETURN = 'return',
    RETURN_TRANSPORTING = 'return_transporting',
    RETURN_SORTING = 'return_sorting',
    RETURNING = 'returning',
    RETURN_FAIL = 'return_fail',
    RETURNED = 'returned',
    EXCEPTION = 'exception',
    DAMAGE = 'damage',
    LOST = 'lost',
}

export enum LABEL_SIZE {
    SMALL = 'SMALL',
    NORMAL = 'NORMAL',
    LARGE = 'LARGE',
}

export enum SIZE_MAPPING {
    SMALL = 'print52x70',
    NORMAL = 'print80x80',
    LARGE = 'printA5',
}

export const GHN_CODE = {
    SUCCESS: 200,
    FAILURE: 400,
};

export const GHN_ERROR_MESSAGE = {
    UNSUPPORTED_PLACE: 'chưa hỗ trợ',
    UNSUPPORTED_PLACE2: 'không lấy được thông tin kho',
    INVALID_PHONE: 'điện thoại',
    INVALID_MEASURE: 'vượt quá',
};

export enum GHN_TYPE {
    CREATE = 'create',
    SWITCH_STATUS = 'switch_status',
    UPDATE_WEIGHT = 'update_weight',
    UPDATE_COD = 'update_cod',
    UPDATE_FEE = 'update_fee',
}

export const SHOP_ADDRESS = {
    FULL_ADDRESS: '141 Đường số 2, Phường Hiệp Bình Phước, Thành Phố Thủ Đức',
    FROM_WARD: 'Phường Hiệp Bình Phước',
    FROM_DISTRICT: 'Thành Phố Thủ Đức',
    FROM_CITY: 'Hồ Chí Minh',
    FROM_WARD_CODE: '90740',
    FROM_DISTRICT_ID: 3695,
};

export const UPDATE_TYPE = {
    WEIGHT: 'weight',
    DELIVERY_FEE: 'deliveryFee',
    STATUS: 'orderStatus',
};

const DEV_DOMAIN = 'https://dev-online-gateway.ghn.vn/';
const PRODUCTION_DOMAIN = 'https://online-gateway.ghn.vn/';
export const GHN_CONFIG = {
    TOKEN: 'ef189e77-e059-11ee-a6e6-e60958111f48',
    SHOP_ID: 191002,
    SERVICE_ID: 53320,
    SERVICE_TYPE_ID: 2,
    PAYMENT_TYPE_ID: 2, // 1 shop will pay, 2 buyer will pay
    PICK_STATION_ID: 1444,
    CREATE_URL: 'shiip/public-api/v2/shipping-order/create',
    PRINT_URL: 'a5/public-api/',
    CANCEL_URL: 'shiip/public-api/v2/switch-status/cancel',
    GEN_TOKEN: 'shiip/public-api/v2/a5/gen-token',
    CALCULATE_FEE: 'shiip/public-api/v2/shipping-order/fee',
    GET_DETAIL: 'shiip/public-api/v2/shipping-order/detail',
    UPDATE_ORDER: 'shiip/public-api/v2/shipping-order/update',
    GET_ORDER_FEE: 'shiip/public-api/v2/shipping-order/soc',
};
export const returnTypes = [
    GHN_STATUS.DELIVERY_FAIL,
    GHN_STATUS.WAITING_TO_RETURN,
    GHN_STATUS.RETURN,
    GHN_STATUS.RETURN_TRANSPORTING,
    GHN_STATUS.RETURN_SORTING,
    GHN_STATUS.RETURNING,
    GHN_STATUS.RETURN_FAIL,
    GHN_STATUS.RETURNED,
    GHN_STATUS.EXCEPTION,
    GHN_STATUS.DAMAGE,
    GHN_STATUS.LOST,
];

export const startDeliveryTypes = [
    GHN_STATUS.MONEY_COLLECT_DELIVERING,
    GHN_STATUS.PICKED,
    GHN_STATUS.STORING,
    GHN_STATUS.TRANSPORTING,
    GHN_STATUS.SORTING,
    GHN_STATUS.DELIVERING,
    GHN_STATUS.MONEY_COLLECT_DELIVERING,
];
