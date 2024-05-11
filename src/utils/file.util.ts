import fse from 'fs-extra';
import im from 'imagemagick';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { Configs } from '../constants';
import { randomString } from './common.util';
import { getFormatDate } from './date.util';

export const formatBytes = (a: number, b?: number, space?: boolean): string => {
    if (a === 0) return '0 Bytes';
    var c = 1024,
        d = b || 2,
        e = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        f = Math.floor(Math.log(a) / Math.log(c));
    return parseFloat((a / Math.pow(c, f)).toFixed(d)) + (space ? ' ' : '') + e[f];
};

const getCropImageOption = (mediaConfig: any): any => {
    const { kind, crop } = mediaConfig || {};
    return kind ? kind.crop : crop;
};

type GetUploadFileDetailOptions = {
    name?: string;
    size?: number;
    md5?: any;
};

export const getUploadFileDetail = (mediaConfig: any, options?: GetUploadFileDetailOptions): any => {
    const { name, size, md5 } = options || {};
    let ext = name?.split('.').pop();
    let newName = `${randomString('mix', 10)}.${ext}`;
    let datePath = `/${getFormatDate('yyyy/MM/dd')}/`;
    let processFullPath = Configs.UPLOAD_TYPE.PROCESSING + datePath;
    let saveFullPath = Configs.UPLOAD_TYPE.TEMP + datePath;
    return {
        detail: {
            size,
            md5,
            ext,
            originName: name,
            fileName: newName,
            url: saveFullPath + newName,
        },
        fileName: newName,
        cropOption: getCropImageOption(mediaConfig),
        processPath: Configs.CDN_PATH + processFullPath,
        savePath: Configs.CDN_PATH + saveFullPath,
    };
};

export const ensureUploadPath = (uploadDetail: any) => {
    return new Promise((resolve) => {
        const { detail, cropOption, processPath, savePath } = uploadDetail;
        if (detail.file_type == 'image' && cropOption) {
            fse.ensureDir(processPath, (processDirErr: any) => {
                if (processDirErr) {
                    resolve({ status: false, error: processDirErr });
                }
                fse.ensureDir(savePath, (saveDirErr: any) => {
                    if (saveDirErr) {
                        resolve({ status: false, error: saveDirErr });
                    }
                    resolve({ status: true });
                });
            });
        } else {
            fse.ensureDir(savePath, (saveDirErr: any) => {
                if (saveDirErr) {
                    resolve({ status: false, error: saveDirErr });
                }
                resolve({ status: true });
            });
        }
    });
};

export const saveUploadFile = async (req: any, res: any, savePath: string) => {
    return new Promise((resolve) => {
        let uploader = multer({ dest: './upload/', limits: { fileSize: 10000 } }).any();
        uploader(req, res, (error: any) => {
            if (error) {
                resolve({ status: false, error });
            }
            resolve({ status: true });
        });
    });
};

export const cropUploadFile = async (options: any) => {
    return new Promise((resolve) => {
        im.crop(options, (cropErr: any) => {
            fse.remove(options.srcPath);
            if (cropErr) {
                resolve({ status: false, error: cropErr });
            }
            resolve({ status: true });
        });
    });
};

export const handleUploadFile = async (req: any, res: any, savePath: string, file: any) => {
    const storage = multer.diskStorage({
        destination: (req: any, file: any, cb: any) => {
            cb(null, 'upload/');
        },
        filename: (req: any, file: any, cb: any) => {
            cb(null, Date.now() + '-' + file.originalname);
        },
    });

    const upload = multer({ storage: storage }).any();
    upload(req, res, (error: any) => {
        if (error) {
            // Xử lý lỗi nếu có
            console.error('Error uploading image:', error);
            res.status(500).json({ error: 'Failed to upload image.' });
        } else {
            // Nếu không có lỗi, trả về thông tin về file đã tải lên nếu cần
            if (file) {
                res.status(200).json({ fileName: file.filename });
            } else {
                res.status(400).json({ error: 'No image uploaded.' });
            }
        }
    });
    return null;
};

export async function deleteFile(filePath: string) {
    try {
        fs.unlinkSync(filePath);
    } catch (error) {
        console.log(`Error when deleteFile ${filePath}`);
    }
}

export const FILE_STORAGE = path.join(__dirname, '../../.upload');
