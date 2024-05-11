import mongoose, { Model, Schema, Document } from 'mongoose';
import { MgModification, MgModificationInterface } from './mg.modification.model';

export interface ConfigEntry extends MgModificationInterface {
    name: string;
    code: string;
    type: string;
    data: any;
}

const commonModelSchema = {
    ...MgModification,
    name: { type: String },
    code: { type: String },
    type: { type: String },
    data: { type: Object },
};

const createLogEntityModel = (collectionName: string): Model<ConfigEntry> => {
    const schema = new Schema<ConfigEntry>(commonModelSchema, {
        versionKey: false,
        collection: `${collectionName}`,
    });
    return mongoose.model<ConfigEntry>(`Mg${collectionName}Entity`, schema);
};

export const MgConfigEntry = createLogEntityModel('config');
