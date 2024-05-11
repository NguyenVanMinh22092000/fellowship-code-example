import mongoose, { Schema } from 'mongoose';
import { MgModification, MgModificationInterface } from '.';

export interface OrderStatusEntity extends MgModificationInterface {
    orderId: string;
    registrationNumber: string;
    statuses: OrderStatus[];
}

export type OrderStatus = {
    status: string;
    time: number;
};

const modelSchema = new Schema<OrderStatusEntity>(
    {
        ...MgModification,
        orderId: { type: String, required: false },
        registrationNumber: { type: String, required: false },
        statuses: {
            type: [
                {
                    status: { type: String, required: true },
                    time: { type: Number, required: true },
                },
            ],
            required: false,
            _id: false,
        },
    },
    { versionKey: false, collection: 'order_status' },
);

export const MgOrderStatus = mongoose.model<OrderStatusEntity>('MgOrderStatus', modelSchema);
