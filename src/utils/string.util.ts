import { ObjectId } from 'mongodb';
import { logColours } from '../constants';
import { randomString } from './common.util';

export const getLogColorful = (text: string, color: string, bgColor?: string) => {
    let result = (logColours.fg as any)[color] + text + logColours.reset;
    if (bgColor) result = (logColours.bg as any)[bgColor] + result;
    return result;
};

export const isObjectId = (value: any): boolean => {
    if (value instanceof ObjectId) {
        return true;
    }

    if (typeof value === 'string' && ObjectId.isValid(value)) {
        return true;
    }

    return false;
};

export const capitalizeStr = (str: any, all?: boolean) => {
    str = String(str || '').trim();
    if (!str) return '';
    let capitalize = (text: string) => text[0].toUpperCase() + text.slice(1);
    return all ? str.split(' ').map(capitalize).join(' ') : capitalize(str);
};

export const textTransform = (type: any, str = '') => {
    str = String(str || '');
    switch (type) {
        case 'lf':
            return str[0].toLowerCase() + str.substring(1);
        case 'l':
            return str.toLowerCase();
        case 'u':
            return str.toUpperCase();
        case 'c':
            return capitalizeStr(str);
        case 'ca':
            return capitalizeStr(str, true);
        default:
            return str;
    }
};

type UtilTrimStrOptions = {
    type?: string;
    full?: boolean;
    validate?: boolean;
};
export const trimStr = (str: any, { type, full, validate }: UtilTrimStrOptions = {}) => {
    if (!str) return '';
    str = String(str).trim(); // trim text;
    str = str.replace(full ? / /g : /\s\s+/g, full ? '' : ' '); // full ? replace all space to none : replace 2 space to 1 space;
    str = textTransform(type, str);
    return validate ? !!str : str;
};
export const genSessionId = (): string => randomString('mix', 16);
