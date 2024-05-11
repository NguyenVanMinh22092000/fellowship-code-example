import { cloneDeep } from 'lodash';

import {
    cropUploadFile,
    ensureUploadPath,
    formatBytes,
    getUploadFileDetail,
    saveUploadFile,
    throwApiError,
} from '../utils';

import { AppRespCodes, Configs, Mediaconfigs } from '../constants';

import { UploadFileDto } from '../models';

export const UploadService = {
    async upload(req: any, res: any, command: any): Promise<UploadFileDto | null> {
        try {
            const { type, kind, file } = command || {};
            // const type = 'product';
            // const kind = 'report';
            let msg: string = '';

            if (!type) {
                msg = 'Missing param: type';
            }

            // if (file.mimetype.indexOf('image/') === -1) {
            //     msg = 'Invalid upload format';
            // }

            if (file.truncated) {
                msg = `File size exceeds the allowable limit of ${formatBytes(Configs.UPLOAD_FILE_SIZE)}`;
            }
            let mediaConfig: any = cloneDeep(Mediaconfigs.find((config) => config.type === type));

            if (!mediaConfig) {
                msg = 'Invalid param: type';
            }
            if (mediaConfig?.kinds) {
                if (!kind) {
                    msg = `Missing param kind for file type: ${type}`;
                }
                let kindConfig: any = mediaConfig.kinds?.find((config: any) => config.kind === kind);
                if (kindConfig) {
                    mediaConfig.kind = kindConfig;
                } else msg = `Invalid upload kind for file type: ${type}`;
            }

            if (msg) throw throwApiError(AppRespCodes.INVALID_PARAM, msg);
            let uploadDetail = getUploadFileDetail(mediaConfig, file);

            const { detail, cropOption, processPath, savePath, fileName } = uploadDetail;
            let { status, error }: any = ((await ensureUploadPath(uploadDetail)) || {}) as any;
            if (!status) {
                throw error;
            }
            let srcPath = processPath + fileName,
                dstPath = savePath + fileName;

            let saveFileState: any = (await saveUploadFile(req, res, cropOption ? srcPath : dstPath)) || {};
            if (!saveFileState.status) {
                throw saveFileState.error;
            }

            if (cropOption) {
                let cropResp: any = (await cropUploadFile({ ...cropOption, srcPath, dstPath })) || {};
                if (!cropResp.status) {
                    throw cropResp.error;
                }
            }

            return {
                src: dstPath,
            };
        } catch (error) {
            console.log('Error: ', error);
            return null;
        }
    },
};
