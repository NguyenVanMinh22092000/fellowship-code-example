import mongoose, { Schema } from 'mongoose';
import { MgModification, MgModificationInterface } from '.';

export interface ShippingCompany {
    countryCode: string;
    shippingCompanyId: string;
}

export interface SellerEntity extends MgModificationInterface {
    name: string;
    code: string;
    nameOfCeo: string;
    phoneNumbers: string[];
    email: string;
    administratorName: string;
    ownerName: string;
    adminOfName: string;
    managerName: string;
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
    shippingCompany: ShippingCompany[];
    keyword: string;
}

const modelSchema = new Schema<SellerEntity>(
    {
        ...MgModification,
        name: { type: String, required: true },
        code: { type: String, required: true },
        nameOfCeo: { type: String, required: false },
        phoneNumbers: { type: [String], required: false },
        email: { type: String, required: false },
        administratorName: { type: String, required: false },
        ownerName: { type: String, required: false },
        adminOfName: { type: String, required: false },
        managerName: { type: String, required: false },
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
                name: { type: String, required: false },
                address: { type: String, required: false },
                district: { type: String, required: false },
                city: { type: String, required: false },
                state: { type: String, required: false },
                postCode: { type: String, required: false },
            },
            required: false,
            _id: false,
        },
        returnAddress: {
            type: {
                postCode: { type: String, required: false },
                address: { type: String, required: false },
                name: { type: String, required: false },
                phoneNumber: { type: String, required: false },
            },
            required: false,
            _id: false,
        },
        shippingCompany: {
            type: [
                {
                    countryCode: { type: String, required: false },
                    shippingCompanyId: { type: String, required: false },
                },
            ],
            _id: false,
        },
        keyword: { type: String, required: false },
    },
    { versionKey: false, collection: 'seller' },
);
export const MgSeller = mongoose.model<SellerEntity>('MgSeller', modelSchema);
