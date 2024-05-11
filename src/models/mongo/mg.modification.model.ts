import { model, property } from '@loopback/repository';
import mongoose, { Document, Model, ObjectId } from 'mongoose';
import mongooseLong from 'mongoose-long';

mongooseLong(mongoose);
const Schema = mongoose.Schema;
const Long = Schema.Types.Long;

const MgModifier = {
    _id: String,
    email: String,
};

export const MgModification = {
    _id: {
        type: Schema.Types.ObjectId,
        auto: true,
    },
    isDeleted: Boolean,
    createdDate: Number, // timestamp
    // createdBy: MgModifier,
    createdBy: String,
    updatedDate: Number, // timestamp
    // updatedBy: MgModifier,
    updatedBy: String,
    bnnOrgId: String,
    sellerOrgId: String,
    agentOrgId: String,
};

export interface MgModifierInterface {
    _id: string;
    email: string;
}

export interface MgModificationInterface extends Document {
    _id: ObjectId;
    isDeleted: boolean;
    createdDate: number;
    createdBy: string;
    updatedDate: number;
    updatedBy: string;
    bnnOrgId: string;
    sellerOrgId: string;
    agentOrgId: string;
}

@model()
export class ModificationModel extends Model {
    @property({
        type: 'string',
        id: true,
        generated: true,
    })
    _id?: string;

    @property({
        type: 'boolean',
        default: false,
    })
    isDeleted?: boolean;

    @property({
        type: 'number',
        default: +new Date(),
    })
    createdDate?: number;

    @property({
        type: 'string',
    })
    createdBy?: string;

    @property({
        type: 'number',
        default: +new Date(),
    })
    updatedDate?: number;

    @property({
        type: 'string',
    })
    updatedBy?: string;
}

@model()
export class ModificationOrgModel extends ModificationModel {
    @property({
        type: 'string',
        default: false,
    })
    bnnOrgId: string;

    @property({
        type: 'string',
        default: false,
    })
    sellerOrgId: string;

    @property({
        type: 'string',
        default: false,
    })
    agentOrgId: string;
}
