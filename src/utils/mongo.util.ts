const ObjectId = require('mongoose').Types.ObjectId;

import { removeViChar } from './common.util';

const modifierKeys = ['createdDate', 'createdBy', 'updatedDate', 'updatedBy'];

const getMgModifier = (token?: any) => token?._id;

export const getMgObjectId = (id: any) => {
    try {
        return new ObjectId(id);
    } catch (error) {
        return null;
    }
};

export const newMgModel = (data: any, token?: any) => {
    let now = +new Date();
    let modifier = getMgModifier(token);
    return {
        createdDate: now,
        createdBy: modifier,
        updatedDate: now,
        updatedBy: modifier,
        isDeleted: false,
        ...data,
    };
};

export const updateMgModel = (data: any, token?: any) => {
    return {
        updatedDate: +new Date(),
        updatedBy: getMgModifier(token),
        ...data,
    };
};

export const updateModifyMgModel = (data: any, token?: any) => {
    return {
        updatedDate: +new Date(),
        updatedBy: getMgModifier(token),
    };
};

export const getMgKeywordQuery = (keysearch?: string, fieldTxt?: string): object[] => {
    if (!keysearch || !fieldTxt) return [];
    let searchOpts: object[] = [],
        fields = fieldTxt.split(' ');
    let searchReg = new RegExp(removeViChar(keysearch), 'i');
    if (fields.length > 0) {
        fields.forEach((field) => {
            if (field) {
                searchOpts.push({ [field]: searchReg });
            }
        });
    }
    return searchOpts;
};

export const getMgSelect = (adds?: any, excludes?: any) => {
    let selects = ['isDeleted', 'password'];
    if (adds) {
        selects.push(...(adds.modifier ? [...modifierKeys, ...(adds.list || [])] : adds));
    }
    if (excludes) {
        selects = selects.filter((i) => !excludes.includes(i));
    }
    return '-' + selects.join(' -');
};

export const getMgCreatedDateQuery = (fromDate?: any, toDate?: any) => {
    let findOpts: any = {};
    switch (true) {
        case !!(fromDate && toDate):
            findOpts.createdDate = { $gte: fromDate, $lte: toDate };
            break;
        case !!fromDate:
            findOpts.createdDate = { $gte: fromDate };
            break;
        case !!toDate:
            findOpts.createdDate = { $lte: toDate };
            break;
        default:
            break;
    }
    return findOpts;
};
