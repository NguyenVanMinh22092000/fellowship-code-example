import { ORDER_STATUS } from '../enums';
import { removeViChar } from './common.util';

export const calculateTotal = (products: any[]) => {
    return products.reduce((acc, { unitPrice, quantity }) => acc + unitPrice * quantity, 0);
};

export const calculateVolumbetricWeight = (weight: any, height: any, length: any) => {
    return (weight * height * length) / 6000;
};

export const formatStt = (stt: number) => {
    const sttString = String(stt);
    const sttLength = sttString.length;
    const zeroCount = 6 - sttLength;
    if (zeroCount <= 0) {
        return sttString;
    } else {
        return '0'.repeat(zeroCount) + sttString;
    }
};

export const getValueOrDefault = (value: string, defaultValue = '') => {
    return value !== undefined && value !== null ? value : defaultValue;
};
export const formatOrderKeyword = (keywordParts: string[]) => {
    const keyword: any = keywordParts.map((part) => getValueOrDefault(part)).join(' ');
    return removeViChar(keyword);
};

export const isVietNamPostalAddress = (postalAddress: any) => {
    return postalAddress && postalAddress.countryCode && postalAddress.countryCode === 'VN';
};

export const isDeliveringOrder = (orderStatus: string) => {
    return orderStatus && orderStatus !== ORDER_STATUS.READY_FOR_WAREHOUSING && orderStatus !== ORDER_STATUS.SUSPENDED;
};

export const getCellValue = (row: any, cellIndex: number) => {
    const cell = row.getCell(cellIndex);
    return cell.value ? cell.value.toString() : '';
};
