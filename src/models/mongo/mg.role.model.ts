import mongoose, { Schema } from 'mongoose';
import { MgModification, MgModificationInterface } from '.';

interface SysFunction {
    name: string;
    enabled: boolean;
    urls: string[];
    description: string;
    value: string;
}

interface SysModule {
    name: string;
    enabled: boolean;
    functions: SysFunction[];
}

export interface RoleEntity extends MgModificationInterface {
    code: string;
    name: string;
    desc?: string;
    version: string;
    hasModule: boolean;
    modules: SysModule[];
}

const modelSchema = new Schema<RoleEntity>(
    {
        ...MgModification,
        code: { type: String, required: false },
        name: { type: String, required: false },
        desc: { type: String },
        version: { type: String, required: false },
        hasModule: { type: Boolean, required: false },
        modules: [
            {
                name: { type: String, required: false },
                enabled: { type: Boolean, required: false },
                functions: [
                    {
                        name: { type: String, required: false },
                        enabled: { type: Boolean, required: false },
                        urls: [{ type: String, required: false }],
                        description: { type: String, required: false },
                        value: { type: String, required: false },
                    },
                ],
            },
        ],
    },
    { versionKey: false, collection: 'role' },
);

export const MgRole = mongoose.model<RoleEntity>('MgRole', modelSchema);
