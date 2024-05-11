import { model, property } from '@loopback/repository';
import { ModificationOrgModel } from './mongo';

@model()
export class DeliveryNumber extends ModificationOrgModel {
    @property({
        type: 'number',
    })
    startNumber: number;

    @property({
        type: 'number',
    })
    endNumber: number;

    @property({
        type: 'string',
    })
    shippingCompanyId: string;

    @property({
        type: 'string',
    })
    countryCode: string;

    @property({
        type: 'number',
    })
    currentUseNumber: number;

    @property({
        type: 'number',
    })
    totalNumber: number;

    @property({
        type: 'number',
    })
    numberUsed: number;

    @property({
        type: 'number',
    })
    remainNumber: number;

    @property({
        type: 'string',
    })
    status: string;

    @property({
        type: 'string',
    })
    prefix: string;

    @property({
        type: 'string',
    })
    surfix: string;

    @property({
        type: 'number',
    })
    lastUsedDate: number;

    @property({
        type: 'string',
    })
    nameOfApplycompany: string;

    @property({
        type: 'string',
    })
    description: string;

    @property({
        type: 'array',
        itemType: 'any',
    })
    sellersApply: string[];
}
