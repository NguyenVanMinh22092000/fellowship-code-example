import mongoose, { Schema } from 'mongoose';
import { MgModification, MgModificationInterface } from '.';

export interface AgentEntity extends MgModificationInterface {
    isHeadOffice: boolean;
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
    keyword: string;
}

const modelSchema = new Schema<AgentEntity>(
    {
        ...MgModification,
        isHeadOffice: { type: Boolean, required: false },
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
        keyword: { type: String, required: false },
    },
    { versionKey: false, collection: 'agent' },
);
export const MgAgent = mongoose.model<AgentEntity>('MgAgent', modelSchema);
