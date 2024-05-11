function contain(value: any) {
    /* @ts-ignore */
    return Object.values(this).includes(value);
}

export const JOB_NAMES = {
    PROCESSING: 'processing',
    MASTERBILL: 'masterbill',
    // PROCESSING: 'processing_test',
    // MASTERBILL: 'masterbill_test',
    contain,
};
export const JOB_SERVICES = {
    ORDER: 'order',
    MASTERBILL: 'masterbill',
    contain,
};

export const JOB_TYPES = {
    IMPORT: 'import',
    EXPORT: 'export',
    IMPORT_ERROR: 'import_error',
    PRINT: 'print',
    UPDATE_STATUS: 'update_status',
    contain,
};
