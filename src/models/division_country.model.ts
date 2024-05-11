import { model, property } from '@loopback/repository';
import { CommonInfo } from './common.model';

export declare type DivisionCountry = {
    nameRepresent: string[];
    code: string;
    level: number;
    levelName: string;
    searchText: string;
    activeStatus: string;
    parentCode: string;
    countryCode: string;
    name: string;
} & CommonInfo;

@model()
export class DivisionCountryGetListQuery {
    @property({
        type: 'number',
    })
    level?: number;

    @property({
        type: 'string',
    })
    countryCode?: string;

    @property({
        type: 'string',
    })
    parentCode?: string;
}
