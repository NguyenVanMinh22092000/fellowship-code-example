import { Model, model, property } from '@loopback/repository';

@model()
export class ViewLayout extends Model {
    @property({
        type: 'array',
        itemType: 'string',
        default: [],
    })
    orderViews?: string[];
    @property({
        type: 'array',
        itemType: 'string',
        default: [],
    })
    masterBillViews?: string[];
}

@model()
export class ViewLayoutCrud extends Model {
    @property({
        type: 'array',
        required: false,
        itemType: 'string',
        default: [],
    })
    orderViews?: string[];

    @property({
        type: 'array',
        itemType: 'string',
        default: [],
    })
    masterBillViews?: string[];
}
