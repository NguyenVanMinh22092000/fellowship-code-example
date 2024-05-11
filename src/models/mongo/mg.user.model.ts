import mongoose from 'mongoose';

import { MgModification, MgModificationInterface } from '.';

import { USER_STATUS, USER_TYPE } from '../../enums';

const Schema = mongoose.Schema;

export type UserEntity = {
    userId: string;
    roleId: string;
    code: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    password: string;
    avatar: string;
    address: string;
    status: string;
    type: string;
    note: string;
    fullNameKeyword: string;
} & MgModificationInterface;

export const userModel = {
    ...MgModification,
    userId: { type: String, required: false },
    roleId: { type: String, required: false },
    code: { type: String, required: false },
    fullName: { type: String, required: false },
    email: { type: String, required: false },
    phoneNumber: { type: String, required: false },
    password: { type: String, required: false },
    avatar: { type: String, required: false },
    address: { type: String, required: false },

    status: { type: String, default: USER_STATUS.INACTIVE },
    type: { type: String, default: USER_TYPE.NORMAL },
    note: { type: String, required: false },
    fullNameKeyword: { type: String, default: '' },
};
export const userModelSchema = new Schema<UserEntity>(userModel, { versionKey: false, collection: 'user' });
export const mgUser = mongoose.model<UserEntity>('mgUserEntity', userModelSchema);
