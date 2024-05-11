import { MgModification } from './mg.modification.model';
import mongoose, { Schema } from 'mongoose';
import { MgModificationInterface } from '.';
import { BILL_STATUS, TRANSPORT_TYPE } from '../../enums';

interface AddressInBill {
    countryCode: string;
    transportCode: string;
}

interface Job {
    departure: string;
    arrive: string;
    process: string;
    clear: string;
}

export interface MasterBillEntity extends MgModificationInterface {
    billNo: string;
    billStatus: BILL_STATUS;
    transportType: TRANSPORT_TYPE;
    agentOrgId: string;
    vehicleNumber: string;
    netWeight: number;
    chargeableWeight: number;
    memo: string;
    note: string;
    departure: AddressInBill;
    destination: AddressInBill;
    departureTime: number;
    arriveTime: number;
    customesProcessingTime: number;
    customesClearanceTime: number;
    orders: string[];
    isPrintedLabel: boolean;
    deliveryProvider: string;
    job: Job;
}

const modelSchema = new Schema<MasterBillEntity>(
    {
        ...MgModification,
        billNo: { type: String, required: true },
        billStatus: { type: String, enum: Object.values(BILL_STATUS), required: false, default: BILL_STATUS.INIT },
        transportType: { type: String, enum: Object.values(TRANSPORT_TYPE), required: true },
        agentOrgId: { type: String, required: true },
        vehicleNumber: { type: String, required: true },
        netWeight: { type: Number, required: true },
        chargeableWeight: { type: Number, required: true },
        memo: { type: String, required: false },
        note: { type: String, required: false },
        departure: {
            type: {
                countryCode: { type: String, required: false },
                transportCode: { type: String, required: true },
            },
            required: true,
            _id: false,
        },
        destination: {
            type: {
                countryCode: { type: String, required: true },
                transportCode: { type: String, required: true },
            },
            required: true,
            _id: false,
        },
        departureTime: { type: Number, required: true },
        arriveTime: { type: Number, required: true },
        customesProcessingTime: { type: Number, required: true },
        customesClearanceTime: { type: Number, required: true },
        orders: {
            type: [String],
            required: false,
            _id: false,
        },
        job: {
            type: {
                departure: { type: String, required: false },
                arrive: { type: String, required: false },
                process: { type: String, required: false },
                clear: { type: String, required: false },
            },
            required: false,
            _id: false,
        },
        isPrintedLabel: { type: Boolean, required: false, default: false },
        deliveryProvider: { type: String, required: false },
    },
    { versionKey: false, collection: 'masterbill' },
);

export const MgMasterBill = mongoose.model<MasterBillEntity>('MgMasterBill', modelSchema);
