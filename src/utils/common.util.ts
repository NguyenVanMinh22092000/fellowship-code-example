import { v1 as uuidv1, v3 as uuidv3, v4 as uuidv4, v5 as uuidv5 } from 'uuid';

import isEmpty from 'lodash/isEmpty';

export const isUndefined = (e: any) => {
    switch (e) {
        case 'undefined':
            return true;
        case 'NaN':
            return true;
        case undefined:
            return true;
        case '':
            return true;
        case null:
            return true;
        case 'null':
            return true;
        case false:
            return true;
        case 'false':
            return true;
        default:
            return false;
    }
};

export const isString = (value: any) => {
    return typeof value === 'string';
};

export const isObject = (value: any, isNotEmpty?: any) => {
    if (typeof value === 'object' && !isUndefined(value)) {
        if (isNotEmpty) {
            return !isEmpty(value);
        } else {
            return true;
        }
    }
    return false;
};

export const isArray = (value: any, minLength?: any) =>
    Array.isArray(value) && (minLength ? value.length >= (typeof minLength === 'number' ? minLength : 1) : true);

export const isNumeric = (value: any) => /^[\d]+$/.test(value);

export const isNumber = (value: any) =>
    typeof value === 'number' || (typeof value === 'string' && !isNaN(Number(value)));

export const isEmail = (value: any) =>
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        String(value).toLowerCase(),
    );

export const removeViChar = (str: any, noLowerCase?: any) => {
    if (!str) return '';
    str = String(str);
    if (noLowerCase) {
        str = str
            .replace(/[ÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴ]/g, 'A')
            .replace(/[ÈÉẸẺẼÊỀẾỆỂỄ]/g, 'E')
            .replace(/[ÌÍỊỈĨ]/g, 'I')
            .replace(/[ÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠ]/g, 'O')
            .replace(/[ÙÚỤỦŨƯỪỨỰỬỮ]/g, 'U')
            .replace(/[ỲÝỴỶỸ]/g, 'Y')
            .replace(/Đ/g, 'D');
    } else str = str.toLowerCase();
    return str
        .replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, 'a')
        .replace(/[èéẹẻẽêềếệểễ]/g, 'e')
        .replace(/[ìíịỉĩ]/g, 'i')
        .replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, 'o')
        .replace(/[ùúụủũưừứựửữ]/g, 'u')
        .replace(/[ỳýỵỷỹ]/g, 'y')
        .replace(/đ/g, 'd');
};

export const randomString = (input: string, strLength?: number) => {
    let str: any =
        {
            num: '0123456789',
            char: 'ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz',
            mix: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz',
            charLow: 'abcdefghiklmnopqrstuvwxyz',
            charUp: 'ABCDEFGHIJKLMNOPQRSTUVWXTZ',
            numLow: '0123456789abcdefghiklmnopqrstuvwxyz',
            numUp: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZ',
        }[input] ||
        input ||
        '';
    let length = strLength || str.length;
    return Array.from({ length })
        .map(() => {
            let rnum = Math.floor(Math.random() * str.length);
            return str.substring(rnum, rnum + 1);
        })
        .join('');
};

export const shuffleString = (input: string) => {
    let a = input.split(''),
        n = a.length;
    for (let i = n - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
    }
    return a.join('');
};

export const genUuid = (version: number = 1, options: any = {}) => {
    let customNameSpace;
    if (version === 3 || version === 5) {
        if (!isArray(options, true)) {
            return;
        }
        switch (options[1]) {
            case 'DNS':
                customNameSpace = uuidv5.DNS;
                break;
            case 'URL':
                customNameSpace = uuidv5.URL;
                break;
            default:
                customNameSpace = options[1];
                break;
        }
    }
    switch (version) {
        case 0:
            return shuffleString(randomString('char', 11) + +new Date());
        case 1: // timestamp => '2c5ea4c0-4067-11e9-8bad-9b1deb4d3b7d';
            return uuidv1();
        case 3: // namespace
            // using predefined DNS namespace (for domain names) => '9125a8dc-52ee-365b-a5aa-81b0b3681cf6';
            // using predefined URL namespace (for, well, URLs) => 'c6235813-3ba4-3801-ae84-e0a6ebb7d138';
            // using a custom namespace;
            // => Note: Custom namespaces should be a UUID string specific to your application!
            // => E.g. the one here was generated using this modules `uuid` CLI.
            // => const MY_NAMESPACE = '1b671a64-40d5-491e-99b0-da01ff1f3341';
            // => 'e8b5a51d-11c8-3310-a6ab-367563f20686';
            return uuidv3(options[0], customNameSpace);
        case 4:
            return uuidv4(); // random => '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed';
        case 5:
            return uuidv5(options[0], customNameSpace); // namespace, same input type as v3;
        default:
            return;
    }
};

export const arraysAreEqual = (arr1: string[], arr2: string[]): boolean => {
    if (arr1.length !== arr2.length) {
        return false;
    }

    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }
    return true;
};
