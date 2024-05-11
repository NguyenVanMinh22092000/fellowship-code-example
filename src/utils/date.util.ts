import { format as dateFnsFormat } from 'date-fns';

import { isNumber, isNumeric, isUndefined } from './common.util';
import moment from 'moment-timezone';
import { VIET_NAME_TIME_ZONE, getTimeModifier } from '../enums';

export const isDateObject = (d: any) => Object.prototype.toString.call(d) === '[object Date]';
export const isValidDate = (d: any) => d instanceof Date && String(d) !== 'Invalid Date';

export const isDate = (d: any) => {
    if (!d) return false;
    if (!isNumeric(parseFloat(d)) && new Date(d).getTime() >= 0) return true;
    return isDateObject(d) || isValidDate(new Date(parseFloat(d)));
};

export const getDateObj = (d: any, format?: any): any => {
    if (format) {
        return new Date(dateFnsFormat(d, format).toString());
    }
    if (d && !isDate(d)) {
        return null;
    }
    if (d && isNumber(d)) {
        let ts = parseInt(d);
        return new Date(`${ts}`.length === 10 ? ts * 1000 : ts);
    }
    if (d) {
        return new Date(d);
    }
    return new Date();
};

export const getTimestamp = (d: any, format?: any): any => {
    let dateObj = getDateObj(d, format);
    return !isUndefined(dateObj) ? dateObj.getTime() : null;
};

export const getFormatDateWithMoment = (format: string, timeZone: string = VIET_NAME_TIME_ZONE, d?: any) => {
    try {
        const timeModifier: string = getTimeModifier(timeZone);
        const time = moment.tz(d, timeModifier);
        return time.format(format);
    } catch {
        return '';
    }
};

export const getFormatDate = (format: string, d?: any) => {
    try {
        return dateFnsFormat(getTimestamp(d), format);
    } catch {
        return '';
    }
};

export const getDateOffset = (offset: any, d?: any) => {
    let now = getDateObj(d);
    let utcDate = now.getTime() + now.getTimezoneOffset() * 60000;
    let newDateWithOffset = new Date(utcDate + 3600000 * parseInt(offset));
    return newDateWithOffset.getTime();
};
