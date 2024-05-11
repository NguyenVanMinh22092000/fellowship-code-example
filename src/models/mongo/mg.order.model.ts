import mongoose, { Schema } from 'mongoose';

import { ORDER_STATUS } from './../../enums/order.enum';
import { ACTIVE_STATUS, TRANSPORT_TYPE } from '../../enums';

import { MgModification, MgModificationInterface } from '.';
interface SenderInfo {
    name: string;
    address: string;
    phoneNumber: string;
}
interface PostalAddress {
    countryCode: string;
    postalCode: string;
    stateOrProvince: string;
    city: string;
    stateOrProvinceText: string;
    county: string;
    countyText: string;
    streetName: string;
    streetNumber: string;
    buildingName: string;
    buildingNameText: string;
    fullAddress: string;
}
interface ReceiverInfo {
    postalAddress: PostalAddress;
    fullName: string;
    name: string;
    customerId: string;
    phoneNumber1: string;
    phoneNumber2: string;
    customerRefNo: string;
    email: string;
    shippingCountryCode: string;
}
interface Product {
    productId: string;
    name: string;
    quantity: number;
    unitPrice: number;
    brand: string;
    barcode: string;
    capacity: number;
    hsCode: string;
    unit: string;
    link: string;
    sku: string;
}

export type Status = {
    status: string;
    time: number;
};

export interface OrderEntity extends MgModificationInterface {
    registrationNumber: string;
    orderNo01: string;
    orderNo02: string;
    activeStatus: string;
    orderStatus: string;
    destination: string;
    memo: string;
    transportType: TRANSPORT_TYPE;
    agentOrgId: string;
    sellerOrgId: string;
    isSetMasterBill: boolean;
    masterBillId: string;
    billNo: string;
    weight: number;
    totalAmount: number;
    boxCount: number;
    currencyUnit: string;
    deliveryMessage: string;
    width: number;
    length: number;
    height: number;
    userData1: string;
    userData2: string;
    userData3: string;
    sender: SenderInfo;
    receiver: ReceiverInfo;
    products: Product[];
    isPrintedLabel: boolean;
    deliveryProvider: string;
    deliveryCode: string;
    deliveryFee: number;
    deliverService: object;
    actualWeight: number;
    volumetricWeight: number;
    chargebleWeight: number;
    keyword: string;
    receiverNameKeyword: string;
    receiverAddressKeyword: string;
}

const modelSchema = new Schema<OrderEntity>(
    {
        ...MgModification,
        registrationNumber: { type: String, required: true },
        orderNo01: { type: String, required: false },
        orderNo02: { type: String, required: false },
        activeStatus: { type: String, required: false, default: ACTIVE_STATUS.IAC },
        orderStatus: { type: String, required: false, default: ORDER_STATUS.READY_FOR_WAREHOUSING },
        destination: { type: String, required: false },
        memo: { type: String, required: false },
        transportType: { type: String, required: false },
        agentOrgId: { type: String, required: false },
        sellerOrgId: { type: String, required: false },
        isSetMasterBill: { type: Boolean, default: false },
        masterBillId: { type: String, default: '' },
        billNo: { type: String, default: '' },
        weight: { type: Number, required: true },
        totalAmount: { type: Number, required: true },
        boxCount: { type: Number, required: true },
        currencyUnit: { type: String, required: true },
        deliveryMessage: { type: String, required: false, default: '' },
        width: { type: Number, required: true },
        length: { type: Number, required: true },
        height: { type: Number, required: true },
        userData1: { type: String, required: false, default: '' },
        userData2: { type: String, required: false },
        userData3: { type: String, required: false },
        sender: {
            type: {
                name: { type: String, required: true },
                address: { type: String, required: true },
                phoneNumber: { type: String, required: true },
            },
            required: true,
            _id: false,
        },
        receiver: {
            type: {
                postalAddress: {
                    countryCode: { type: String, required: false },
                    postalCode: { type: String, required: false },
                    stateOrProvince: { type: String, required: false },
                    city: { type: String, required: false },
                    stateOrProvinceText: { type: String, required: false },
                    streetName: { type: String, required: false },
                    county: { type: String, required: false },
                    countyText: { type: String, required: false },
                    streetNumber: { type: String, required: false },
                    buildingName: { type: String, required: false },
                    buildingNameText: { type: String, required: false },
                    fullAddress: { type: String, required: false },
                },
                fullName: { type: String, required: false },
                customerId: { type: String, required: false },
                name: { type: String, required: true },
                phoneNumber1: { type: String, required: false },
                phoneNumber2: { type: String, required: false },
                customerRefNo: { type: String, required: false },
                email: { type: String, required: false },
                shippingCountryCode: { type: String, required: false },
            },
            required: true,
            _id: false,
        },

        products: {
            type: [
                {
                    productId: { type: String, required: false },
                    name: { type: String, required: true },
                    quantity: { type: Number, required: true },
                    unitPrice: { type: Number, required: true },
                    brand: { type: String, required: true },
                    capacity: { type: Number, required: false },
                    hsCode: { type: String, required: false },
                    unit: { type: String, required: false },
                    link: { type: String, required: false },
                    sku: { type: String, required: false },
                    barcode: { type: String, required: false },
                },
            ],
            required: true,
            _id: false,
        },
        deliverService: {
            type: Schema.Types.Mixed,
            required: false,
        },
        isPrintedLabel: { type: Boolean, required: false, default: false },
        deliveryProvider: { type: String, required: false },
        deliveryCode: { type: String, required: false },
        deliveryFee: { type: Number, required: false },
        actualWeight: { type: Number, required: false },
        volumetricWeight: { type: Number, required: false },
        chargebleWeight: { type: Number, required: false },
        keyword: { type: String, required: false },
        receiverNameKeyword: { type: String, required: false },
        receiverAddressKeyword: { type: String, required: false },
    },

    { versionKey: false, collection: 'order' },
);

modelSchema.pre('save', async function (next) {
    this.receiver.shippingCountryCode = this.receiver.postalAddress.countryCode;
    this.keyword = this.keyword.toLowerCase();
    next();
});

export const MgOrder = mongoose.model<OrderEntity>('MgOrder', modelSchema);

export interface OrderEntityOptional extends Partial<OrderEntity> {}
