import { model, property } from '@loopback/repository';
import { SearchBody } from '.';
import { ModificationOrgModel } from './mongo';

@model()
export class SenderInfomation {
    @property({
        type: 'string',
        required: false,
    })
    name: string;

    @property({
        type: 'string',
        required: false,
    })
    address: string;

    @property({
        type: 'string',
        required: false,
    })
    district: string;

    @property({
        type: 'string',
        required: false,
    })
    city: string;

    @property({
        type: 'string',
        required: false,
    })
    state: string;

    @property({
        type: 'string',
        required: false,
    })
    postCode: string;
}

@model()
export class ShippingCompany {
    @property({
        type: 'string',
        required: true,
    })
    countryCode: string;

    @property({
        type: 'string',
        required: true,
    })
    shippingCompanyId: string;
}

@model()
export class Seller extends ModificationOrgModel {
    @property({
        type: 'string',
        required: false,
    })
    agentOrgId: string;

    @property({
        type: 'string',
        required: true,
    })
    name: string;

    @property({
        type: 'string',
        required: true,
    })
    code: string;

    @property({
        type: 'string',
        required: false,
    })
    nameOfCeo: string;

    @property({
        type: 'string',
        required: false,
    })
    ownerName: string;

    @property({
        type: 'string',
        required: false,
    })
    adminOfName: string;

    @property({
        type: 'string',
        required: false,
    })
    managerName: string;

    @property({
        type: 'array',
        itemType: 'any',
    })
    phoneNumbers?: string[];

    @property({
        type: 'string',
        required: false,
    })
    email: string;

    @property({
        type: 'string',
        required: false,
    })
    administratorName: string;

    @property({
        type: 'string',
        required: false,
    })
    website: string;

    @property({
        type: 'string',
        required: false,
    })
    countryCode: string;

    @property({
        type: 'string',
        required: false,
    })
    businessLicenseNumber: string;

    @property({
        type: 'string',
        required: false,
    })
    businessType: string;

    @property({
        type: 'string',
        required: true,
    })
    businessItem: false;

    @property({
        type: 'string',
        required: false,
    })
    address: string;

    @property({
        type: 'string',
        required: false,
    })
    logo: string;

    @property({
        type: 'string',
        required: false,
    })
    activeStatus: string;

    @property({
        type: 'object',
        required: true,
    })
    senderInfomation: SenderInfomation;

    @property({
        type: 'object',
        required: true,
    })
    returnAddress: {
        postCode: string;
        address: string;
        name: string;
        phoneNumber: string;
    };

    @property({
        type: 'array',
        itemType: 'any',
    })
    shippingCompany?: ShippingCompany[];

    @property({
        type: 'string',
    })
    keyword: String;
}

@model()
export class SellerCreate extends ModificationOrgModel {
    @property({
        type: 'string',
        required: true,
    })
    name: string;

    @property({
        type: 'string',
        required: true,
    })
    code: string;

    @property({
        type: 'string',
        required: false,
    })
    nameOfCeo: string;

    @property({
        type: 'array',
        itemType: 'any',
    })
    phoneNumbers?: string[];

    @property({
        type: 'string',
        required: false,
    })
    email: string;

    @property({
        type: 'string',
        required: false,
    })
    administratorName: string;

    @property({
        type: 'string',
        required: false,
    })
    website: string;

    @property({
        type: 'string',
        required: false,
    })
    countryCode: string;

    @property({
        type: 'string',
        required: false,
    })
    businessLicenseNumber: string;

    @property({
        type: 'string',
        required: false,
    })
    businessType: string;

    @property({
        type: 'string',
        required: true,
    })
    businessItem: false;

    @property({
        type: 'string',
        required: false,
    })
    address: string;

    @property({
        type: 'string',
        required: false,
    })
    logo: string;

    @property({
        type: 'string',
        required: false,
    })
    activeStatus: string;

    @property({
        type: 'object',
        required: false,
    })
    senderInfomation?: SenderInfomation;

    @property({
        type: 'object',
        required: false,
    })
    returnAddress: {
        postCode: string;
        address: string;
        name: string;
        phoneNumber: string;
    };

    @property({
        type: 'array',
        itemType: 'any',
    })
    shippingCompany?: ShippingCompany[];

    @property({
        type: 'string',
    })
    keyword: String;

    @property({
        type: 'string',
        required: false,
    })
    ownerName: string;

    @property({
        type: 'string',
        required: false,
    })
    adminOfName: string;

    @property({
        type: 'string',
        required: false,
    })
    managerName: string;
}

@model()
export class SellerSearch extends SearchBody {
    @property({
        type: 'string',
        required: false,
    })
    agentOrgId: string;
}

@model()
export class SellerUpdate extends ModificationOrgModel {
    @property({
        type: 'string',
        required: true,
    })
    name: string;

    @property({
        type: 'string',
        required: true,
    })
    code: string;

    @property({
        type: 'string',
        required: false,
    })
    nameOfCeo: string;

    @property({
        type: 'array',
        itemType: 'any',
    })
    phoneNumbers?: string[];

    @property({
        type: 'string',
        required: false,
    })
    email: string;

    @property({
        type: 'string',
        required: false,
    })
    administratorName: string;

    @property({
        type: 'string',
        required: false,
    })
    website: string;

    @property({
        type: 'string',
        required: false,
    })
    countryCode: string;

    @property({
        type: 'string',
        required: false,
    })
    businessLicenseNumber: string;

    @property({
        type: 'string',
        required: false,
    })
    businessType: string;

    @property({
        type: 'string',
        required: true,
    })
    businessItem: false;

    @property({
        type: 'string',
        required: false,
    })
    address: string;

    @property({
        type: 'string',
        required: false,
    })
    logo: string;

    @property({
        type: 'string',
        required: false,
    })
    activeStatus: string;

    @property({
        type: 'object',
        required: false,
    })
    senderInfomation?: SenderInfomation;

    @property({
        type: 'object',
        required: false,
    })
    returnAddress: {
        postCode: string;
        address: string;
        name: string;
        phoneNumber: string;
    };

    @property({
        type: 'array',
        itemType: 'any',
    })
    shippingCompany?: ShippingCompany[];

    @property({
        type: 'string',
    })
    keyword: String;

    @property({
        type: 'string',
        required: false,
    })
    ownerName: string;

    @property({
        type: 'string',
        required: false,
    })
    adminOfName: string;

    @property({
        type: 'string',
        required: false,
    })
    managerName: string;
}
