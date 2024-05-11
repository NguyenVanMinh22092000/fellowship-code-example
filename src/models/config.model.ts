import { Model } from 'mongoose';
import { CommonInfo } from '.';
import { ModificationOrgModel } from './mongo';
import { model, property } from '@loopback/repository';

@model()
export class EmailProvider extends ModificationOrgModel {
    @property({
        type: 'string',
        required: false,
    })
    sendEmail: string;
    @property({
        type: 'string',
        required: false,
    })
    sendName: string;
    @property({
        type: 'string',
        required: false,
    })
    smtpServer: string;
    @property({
        type: 'string',
        required: false,
    })
    smtpHost: string;
    @property({
        type: 'string',
        required: false,
    })
    smtpPort: string;
    @property({
        type: 'string',
        required: false,
    })
    securityProtocol: string;
    @property({
        type: 'string',
        required: false,
    })
    stmpUserName: string;
    @property({
        type: 'string',
        required: false,
    })
    stmpPassword: string;
}

@model()
export class ThirdParty extends ModificationOrgModel {
    @property({
        type: 'string',
        required: false,
    })
    localShipmentId: string;
    @property({
        type: 'string',
        required: false,
    })
    shippingCompanyId: string;
    @property({
        type: 'string',
        required: false,
    })
    name: string;
    @property({
        type: 'string',
        required: false,
    })
    clientToken: string;

    @property({
        type: 'string',
        required: false,
    })
    status: string;
}

@model()
export class Config extends ModificationOrgModel {
    @property({
        type: 'string',
        required: false,
    })
    name: string;

    @property({
        type: 'string',
        required: false,
    })
    code: string;

    @property({
        type: 'string',
        required: false,
    })
    type: string;

    @property({
        type: 'object',
        required: false,
    })
    data?: any;

    [prop: string]: any;
}

@model()
export class SendEmail extends Model {
    @property({
        type: 'string',
        required: false,
    })
    _id: string;
    @property({
        type: 'string',
        required: false,
    })
    recipientEmail: string;
}
