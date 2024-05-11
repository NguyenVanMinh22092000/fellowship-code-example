import mongoose, { Schema } from 'mongoose';
import { MgModification, MgModificationInterface } from '.';

export interface ClassifyEntity extends MgModificationInterface {
    name: string;
    code: string;
    parentId: string;
    nameOfCeo: string;
    phoneNumbers: string[];
    email: string;
    administratorName: string;
    website: string;

    countryCode: string;
    businessLicenseNumber: string;
    businessType: string;
    businessItem: string;
    address: string;
    logo: string;

    activeStatus: string;

    senderInfomation: {
        name: string;
        address: string;
        district: string;
        city: string;
        state: string;
        postCode: string;
    };
    returnAddress: {
        postCode: string;
        address: string;
        name: string;
        phoneNumber: string;
    };
    shippingCompanyId: string[];
    keyword: string;
}

const modelSchema = new Schema<ClassifyEntity>(
    {
        ...MgModification,
        name: { type: String, required: true },
        code: { type: String, required: true },
        parentId: { type: String, required: false },
        nameOfCeo: { type: String, required: false },
        phoneNumbers: { type: [String], required: false },
        email: { type: String, required: false },
        administratorName: { type: String, required: false },
        website: { type: String, required: false },

        countryCode: { type: String, required: false },
        businessLicenseNumber: { type: String, required: false },
        businessType: { type: String, required: false },
        businessItem: { type: String, required: false },
        address: { type: String, required: false },
        logo: { type: String, required: false },

        activeStatus: { type: String, required: false },

        senderInfomation: {
            type: {
                name: { type: String, required: true },
                address: { type: String, required: true },
                district: { type: String, required: true },
                city: { type: String, required: true },
                state: { type: String, required: true },
                postCode: { type: String, required: true },
            },
            required: true,
            _id: false,
        },
        returnAddress: {
            type: {
                postCode: { type: String, required: true },
                address: { type: String, required: true },
                name: { type: String, required: true },
                phoneNumber: { type: String, required: true },
            },
            required: true,
            _id: false,
        },
        shippingCompanyId: { type: [String], required: false },
        keyword: { type: String, required: false },
    },
    { versionKey: false, collection: 'classify' },
);
export const MgClassify = mongoose.model<ClassifyEntity>('MgClassify', modelSchema);
