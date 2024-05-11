const DB_USER = 'admin';
const DB_PWD = '******';
const DB_HOST = 'localhost';
const DB_NAME = 'sample-app';

export default {
    DATABASE: 'mongodb://root:localhost:27017/bnn',
    DEV_MODE: true,
    SERVER_MODE: 'dev',
    CDN_PATH: '/Users/tungpham/Downloads/bnn-tracking/cdn',

    // DEV_MODE: false,
    // SERVER_MODE: 'stg',
    // CDN_PATH: '/apps/resources/upload',

    // Upload configs
    UPLOAD_FILE_SIZE: 5 * 1024 * 1024, // 5MB

    // CDN_PATH: '/apps/bnn-tracking/cdn/upload',

    UPLOAD_TYPE: {
        TEMP: '/temp',
        PROCESSING: '/processing',
    },

    ALLOW_ORIGINS: ['http://localhost:7075', 'https://bnn-cms.omicrm.com'],
};

export const Mediaconfigs = Object.freeze([
    {
        type: 'product',
        kinds: [
            {
                kind: 'report',
            },
        ],
    },
    // {
    //     type: 'project',
    //     kinds: [
    //         {
    //             kind: 'thumbnail',
    //             crop: { width: 800, height: 600 }
    //         },
    //     ],
    // },
]);

export const maxPaginationPageSize = 50;
