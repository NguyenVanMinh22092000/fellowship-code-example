import CryptoJS from 'crypto-js';
import pwdGenerator from 'generate-password';
import jwt from 'jsonwebtoken';

const CRYPTO_SALT = 'c2FtcGxlLWFwcC0yMDIzLXBhc3N3b3Jk'; // src: sample-app-2023-password
const JWT_SALT = 'c2FtcGxlLWFwcC0yMDIzLWp3dA'; // src: sample-app-2023-jwt

type RandomPasswordOption = {
    // *At least one should be true.
    length: number; // Integer, length of password.                                           Default: 10
    numbers: number; // * Boolean, put numbers in password.                                   Default: false
    symbols: number; // * Boolean or String, put symbols in password.                         Default: false
    lowercase: number; // * Boolean, put lowercase in password.                               Default: true
    uppercase: number; // * Boolean, use uppercase letters in password.                       Default: true
    excludeSimilarCharacters: number; // Boolean, exclude similar chars, like 'i' and 'l'.    Default: false
    exclude: number; // String, characters to be excluded from password.                      Default: ''
    strict: number; // Boolean, password must include at least one character from each pool.  Default: false
};

export const encryptString = (str: string) => CryptoJS.AES.encrypt(str, CRYPTO_SALT).toString();
export const decryptString = (cipherText: string) => {
    if (!cipherText) return '';
    let bytes = CryptoJS.AES.decrypt(cipherText, CRYPTO_SALT);
    return bytes.toString(CryptoJS.enc.Utf8);
};

export const encryptPassword = (value: string) => {
    return CryptoJS.SHA1(value).toString();
};

export const encryptMD5 = (value: string) => {
    return CryptoJS.MD5(value).toString();
};

export const signJWT = (data: any, expiresIn: string = '7d') => jwt.sign(data, JWT_SALT, { expiresIn });

export const verifyJWT = (token: string) => {
    try {
        return jwt.verify(token, JWT_SALT);
    } catch {
        return null;
    }
};

export const randomPassword = (options?: RandomPasswordOption) =>
    pwdGenerator.generate({
        length: 24,
        numbers: true,
        symbols: '~!@#$%^&_+-=<>',
        ...options,
    } as any);
