import mongoose, { Model, Schema, Document } from 'mongoose';

interface CommonModelInterface extends Document {
    _id: string;
    refId: string;
    action: string;
    data: any;
}

const commonModelSchema = {
    refId: { type: String },
    action: { type: String },
    data: { type: Object },
};

const createLogEntityModel = (collectionName: string): Model<CommonModelInterface> => {
    const schema = new Schema<CommonModelInterface>(commonModelSchema, {
        versionKey: false,
        collection: `${collectionName}_log`,
    });
    return mongoose.model<CommonModelInterface>(`Mg${collectionName}LogEntity`, schema);
};

export const mgRoleLogEntity = createLogEntityModel('role');
export const mgOrderLogEntity = createLogEntityModel('order');
export const mgUserLogEntity = createLogEntityModel('user');
export const mgAgentLogEntity = createLogEntityModel('agent');
export const mgSellerLogEntity = createLogEntityModel('seller');
export const mgConfigLogEntity = createLogEntityModel('config');
export const mgCountryLogEntity = createLogEntityModel('country');
export const mgDeliveryNumberEntity = createLogEntityModel('delivery_number');
export const mgTransportCodeLogEntity = createLogEntityModel('transport_code');
export const mgLocalShipmentLogEntity = createLogEntityModel('local_shipment');
export const mgCurrencyExchangeLogEntity = createLogEntityModel('currency_exchange');
