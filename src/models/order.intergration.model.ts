import { model, property } from '@loopback/repository';
import { Model } from 'mongoose';
import { REQUIRED_NOTE } from '../enums';

@model()
export class OrderGHN extends Model {
    @property({
        type: 'object',
        id: true,
        generated: true,
    })
    to_name: string;

    @property({
        type: 'string',
        required: true,
    })
    from_name: string;

    @property({
        type: 'string',
        required: true,
    })
    from_phone: string;

    @property({
        type: 'string',
        required: true,
    })
    from_address: string;

    @property({
        type: 'string',
        required: true,
    })
    from_ward_name: string;

    @property({
        type: 'string',
        required: true,
    })
    from_district_name: string;

    @property({
        type: 'string',
        required: true,
    })
    from_provice_name: string;

    @property({
        type: 'string',
        required: true,
    })
    to_phone: string;

    @property({
        type: 'string',
        required: true,
    })
    to_address: string;

    @property({
        type: 'string',
        required: true,
    })
    to_ward_code: string;

    @property({
        type: 'number',
        required: true,
    })
    to_district_id: number;

    @property({
        type: 'string',
        required: false,
    })
    return_phone?: string;

    @property({
        type: 'string',
        required: false,
    })
    return_address?: string;

    @property({
        type: 'number',
    })
    return_district_id?: number;

    @property({
        type: 'string',
        required: false,
    })
    return_ward_code?: string;

    @property({
        type: 'string',
        required: false,
    })
    client_order_code?: string;

    @property({
        type: 'number',
        required: false,
    })
    cod_amount?: number;

    @property({
        type: 'string',
        required: false,
    })
    content?: string;

    @property({
        type: 'number',
        required: true,
    })
    weight: number;

    @property({
        type: 'number',
        required: true,
    })
    length: number;

    @property({
        type: 'number',
        required: true,
    })
    width: number;

    @property({
        type: 'number',
        required: true,
    })
    height: number;

    @property({
        type: 'number',
        required: true,
    })
    pick_station_id?: number;

    @property({
        type: 'number',
        required: false,
    })
    insurance_value?: number;

    @property({
        type: 'string',
        required: false,
    })
    coupon?: string;
    @property({
        type: 'number',
        required: true,
    })
    service_type_id: number;
    @property({
        type: 'number',
        required: true,
    })
    service_id?: number;
    @property({
        type: 'number',
        required: true,
    })
    payment_type_id?: number;
    @property({
        type: 'string',
        required: false,
    })
    note?: string;
    @property({
        type: 'string',
        required: true,
    })
    required_note: REQUIRED_NOTE;
    @property({
        type: 'string',
        required: false,
    })
    pick_shift?: string;
    @property({
        type: 'object',
        required: true,
    })
    Items: object;
    @property({
        type: 'string',
        required: true,
    })
    name: string;
    @property({
        type: 'string',
        required: false,
    })
    code?: string;
    @property({
        type: 'number',
        required: true,
    })
    quantity: number;
    @property({
        type: 'number',
        required: false,
    })
    price?: number;

    @property({
        type: 'string',
        required: false,
    })
    category?: string;
    @property({
        type: 'string',
        required: false,
    })
    level1?: string;
}

@model()
export class OrderGHNCalculateFee extends Model {
    @property({
        type: 'number',
        required: true,
    })
    from_district_id: number;

    @property({
        type: 'string',
        required: true,
    })
    from_ward_code: string;

    @property({
        type: 'number',
        required: true,
    })
    service_id: number;

    @property({
        type: 'number',
        required: true,
    })
    service_type_id: number;

    @property({
        type: 'number',
        required: true,
    })
    to_district_id: number;

    @property({
        type: 'string',
        required: true,
    })
    to_ward_code: string;

    @property({
        type: 'number',
        required: true,
    })
    height: number;

    @property({
        type: 'number',
        required: true,
    })
    length: number;

    @property({
        type: 'number',
        required: true,
    })
    weight: number;

    @property({
        type: 'number',
        required: true,
    })
    width: number;

    @property({
        type: 'string',
        required: false,
    })
    insurance_value?: number;

    @property({
        type: 'number',
        required: false,
    })
    cod_failed_amount?: number;

    @property({
        type: 'string',
    })
    coupon?: string;
}

@model()
export class OrderUpdateGHN extends Model {
    order_code: string;
    to_name?: string;
    from_name?: string;
    from_phone?: string;
    from_address?: string;
    from_ward_name?: string;
    from_district_name?: string;
    from_provice_name?: string;
    to_phone?: string;
    to_address?: string;
    to_ward_code?: string;
    to_district_id?: number;
    return_phone?: string;
    return_address?: string;
    return_district_id?: number;
    return_ward_code?: string;
    client_order_code?: string;
    cod_amount?: number;
    content?: string;
    length?: number;
    width?: number;
    height?: number;
    pick_station_id?: number;
    insurance_value?: number;
    coupon?: string;
    service_type_id?: number;
    service_id?: number;
    payment_type_id?: number;
    note?: string;
    required_note?: REQUIRED_NOTE;
    pick_shift?: string;
    Items?: object;
    name?: string;
    code?: string;
    quantity?: number;
    price?: number;
    category?: string;
    level1?: string;
}

interface Payment {
    value?: number;
    payment_type?: number;
    paid_date?: string;
    created_date?: string;
}

interface OrderDetail {
    main_service?: number;
    insurance?: number;
    station_do?: number;
    station_pu?: number;
    return?: number;
    r2s?: number;
    coupon?: number;
}

@model()
export class OrderGetFeeGHN extends Model {
    order_code?: string;
    detail?: OrderDetail;
    payment?: Payment[];
    cod_collect_date?: string;
    transaction_id?: string;
    created_ip?: string;
    created_date?: string;
    updated_ip?: string;
    updated_client?: number;
    updated_employee?: number;
    updated_source?: string;
    updated_date?: string;
}

@model()
export class GHNResponse extends Model {
    code: number;
    message?: string;
    data?: any;
    code_message?: string;
    code_message_value?: string;
}

@model()
export class OrderGHNGetDetail extends Model {
    shop_id?: number;
    client_id?: number;
    return_name?: string;
    return_phone?: string;
    return_address?: string;
    return_ward_code?: string;
    return_district_id?: number;
    from_name?: string;
    from_phone?: string;
    from_address?: string;
    from_ward_code?: string;
    from_district_id?: number;
    deliver_station_id?: number;
    to_name?: string;
    to_phone?: string;
    to_address?: string;
    to_ward_code?: string;
    to_district_id?: number;
    weight?: number;
    length?: number;
    width?: number;
    height?: number;
    converted_weight?: number;
    service_type_id?: number;
    service_id?: number;
    payment_type_id?: number;
    custom_service_fee?: number;
    cod_amount?: number;
    cod_collect_date?: string;
    cod_transfer_date?: string;
    is_cod_transferred?: boolean;
    is_cod_collected?: boolean;
    insurance_value?: number;
    order_value?: number;
    pick_station_id?: number;
    client_order_code?: string;
    cod_failed_amount?: number;
    cod_failed_collect_date?: string;
    required_note?: string;
    content?: string;
    note?: string;
    employee_note?: string;
    coupon?: string;
    _id?: string;
    order_code?: string;
    version_no?: string;
    updated_ip?: string;
    updated_employee?: number;
    updated_client?: number;
    updated_source?: string;
    updated_date?: string;
    updated_warehouse?: number;
    created_ip?: string;
    created_employee?: number;
    created_client?: number;
    created_source?: string;
    created_date?: string;
    status?: string;
    pick_warehouse_id?: number;
    deliver_warehouse_id?: number;
    current_warehouse_id?: number;
    return_warehouse_id?: number;
    next_warehouse_id?: number;
    leadtime?: string;
    order_date?: string;
    soc_id?: string;
    finish_date?: string;
    tag?: string[];
    log?: {
        status?: string;
        updated_date?: string;
    }[];
}
