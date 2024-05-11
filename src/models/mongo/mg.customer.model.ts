import mongoose, { Schema } from 'mongoose';

import { MgModification, MgModificationInterface } from '.';
import { ACTIVE_STATUS } from '../../enums';

export type PostalAddress = {
    countryCode: string;
    postalCode: string;
    stateOrProvince: string;
    stateOrProvinceText: string;
    city: string;
    county: string;
    countyText: string;
    streetName: string;
    streetNumber: string;
    buildingNameText: string;
    buildingName: string;
    fullAddress: string;
};

export type CustomerEntity = {
    activeStatus: string;
    sellerOrgId: string;
    agentOrgId: string;
    fullName: string;
    phoneNumber1: string;
    phoneNumber2: string;
    customerRefNo: string;
    email: string;
    shippingCountryCode: string;
    searchText: string;
    postalAddress: PostalAddress;
} & MgModificationInterface;

const modelSchema = new Schema<CustomerEntity>(
    {
        ...MgModification,
        activeStatus: { type: String, default: ACTIVE_STATUS.ACT },
        sellerOrgId: { type: String, required: true },
        agentOrgId: { type: String, required: true },
        fullName: { type: String, required: true },
        phoneNumber1: { type: String, required: true },
        phoneNumber2: { type: String },
        customerRefNo: { type: String },
        email: { type: String },
        searchText: { type: String },
        shippingCountryCode: { type: String },
        postalAddress: {
            countryCode: { type: String, required: true },
            postalCode: { type: String, required: true },
            stateOrProvinceText: { type: String, required: false },
            countyText: { type: String, required: false },
            buildingNameText: { type: String, required: false },
            stateOrProvince: { type: String },
            city: { type: String },
            county: { type: String },
            streetName: { type: String },
            buildingName: { type: String },

            streetNumber: { type: String },
            fullAddress: { type: String, required: true },
        },
    },
    { versionKey: false, collection: 'customer' },
);

export const MgCustomer = mongoose.model<CustomerEntity>('mgCustomerEntity', modelSchema);
