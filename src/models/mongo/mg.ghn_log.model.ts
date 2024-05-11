import mongoose, { Schema } from 'mongoose';
import { MgModification, MgModificationInterface } from './mg.modification.model';
import { GHN_STATUS, GHN_TYPE } from '../../enums';

export interface Fee {
    CODFailedFee: number;
    CODFee: number;
    Coupon: number;
    DeliverRemoteAreasFee: number;
    DocumentReturn: number;
    DoubleCheck: number;
    Insurance: number;
    MainService: number;
    PickRemoteAreasFee: number;
    R2S: number;
    Return: number;
    StationDO: number;
    StationPU: number;
    Total: number;
}

export interface GHNLogEntity extends MgModificationInterface {
    CODAmount: number;
    CODTransferDate: Date | null;
    ClientOrderCode: string;
    ConvertedWeight: number;
    Description: string;
    Fee: Fee;
    Height: number;
    IsPartialReturn: boolean;
    Length: number;
    OrderCode: string;
    PartialReturnCode: string;
    PaymentType: number;
    Reason: string;
    ReasonCode: string;
    ShopID: number;
    Status: GHN_STATUS;
    Time: Date;
    TotalFee: number;
    Type: GHN_TYPE;
    Warehouse: string;
    Weight: number;
    Width: number;
}

const modelSchema = new Schema<GHNLogEntity>(
    {
        ...MgModification,
        CODAmount: { type: Number, required: false },
        CODTransferDate: { type: Date, required: false },
        ClientOrderCode: { type: String, required: false },
        ConvertedWeight: { type: Number, required: false },
        Description: { type: String, required: false },
        Fee: {
            type: {
                CODFailedFee: { type: Number, required: false },
                CODFee: { type: Number, required: false },
                Coupon: { type: Number, required: false },
                DeliverRemoteAreasFee: { type: Number, required: false },
                DocumentReturn: { type: Number, required: false },
                DoubleCheck: { type: Number, required: false },
                Insurance: { type: Number, required: false },
                MainService: { type: Number, required: false },
                PickRemoteAreasFee: { type: Number, required: false },
                R2S: { type: Number, required: false },
                Return: { type: Number, required: false },
                StationDO: { type: Number, required: false },
                StationPU: { type: Number, required: false },
                Total: { type: Number, required: false },
            },
            _id: false,
            required: false,
        },
        Height: { type: Number, required: false },
        IsPartialReturn: { type: Boolean, required: false },
        Length: { type: Number, required: false },
        OrderCode: { type: String, required: false },
        PartialReturnCode: { type: String, required: false },
        PaymentType: { type: Number, required: false },
        Reason: { type: String, required: false },
        ReasonCode: { type: String, required: false },
        ShopID: { type: Number, required: false },
        Status: { type: String, required: false },
        Time: { type: Date, required: false },
        TotalFee: { type: Number, required: false },
        Type: { type: String, required: false },
        Warehouse: { type: String, required: false },
        Weight: { type: Number, required: false },
        Width: { type: Number, required: false },
    },
    { versionKey: false, collection: 'ghn_log' },
);

export const MgGHNLog = mongoose.model<GHNLogEntity>('MgGHNLog', modelSchema);
