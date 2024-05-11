import { model, property } from '@loopback/repository';
import { SearchBody } from '.';
import { ModificationOrgModel } from './mongo';

@model()
export class Classify extends ModificationOrgModel {
    @property({
        type: 'boolean',
        required: false,
    })
    isHeadOffice: boolean;

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
    })
    parentId: string;

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
        type: 'string',
    })
    keyword: String;
}

@model()
export class ClassifySearch extends SearchBody {
    @property({
        type: 'string',
        required: false,
    })
    agentId?: string;

    @property({
        type: 'string',
        required: false,
    })
    agentOrgId?: string;
}
