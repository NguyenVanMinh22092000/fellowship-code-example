function contain(value: any) {
    /* @ts-ignore */
    return Object.values(this).includes(value);
}

export const ACTIVE_STATUS = {
    ACT: 'ACT',
    IAC: 'IAC',
    contain,
};

export const ACTION = {
    UPDATE: 'UPDATE',
    DELETE: 'DELETE',
    contain,
};

export const API_METHOD = {
    POST: 'post',
    GET: 'get',
    PUT: 'put',
    DELETE: 'delete',
    PATCH: 'patch',
};

export const BOOLEAN_STATUS = {
    TRUE: 'true',
    FALSE: 'false',
};

export const COLOR = {
    YELLOW: 'FFF455',
    GRAY: 'FFA0A0A0',
    PINK: 'e5b8b7',
};

export const PROCESSING_STATUS = {
    PROCESSING: 'processing',
    DONE: 'done',
    ERROR: 'error',
    contain,
};

export const TYPE_LOG = {
    ROLE: 'role',
    ORDER: 'order',
    USER: 'user',
    AGENT: 'agent',
    SELLER: 'seller',
    CONFIG: 'config',
    COUNTRY: 'country',
    DELIVERY_NUMBER: 'delivery_number',
    TRANSPORT_CODE: 'transport_code',
    LOCAL_SHIPMENT: 'local_shipment',
    CURRENCY_EXCHANGE: 'currency_exchange',
    contain,
};

export const ACTION_LOG = {
    CREATE: 'Create',
    DELETE: 'Delete',
    PUT: 'Put',
    UPDATE: 'Update',
    UPDATE_ACTIVE_USER: 'Active User',
    UPDATE_RESET_PASSWORD: 'Reset Password',
    contain,
};

export const THIRD_PARTY_STATUS = {
    ACTIVED: 'Actived',
    INACTIVED: 'inactivated',
    contain,
};

export const SECURITY_PROTOCOL = {
    NONE: 'none',
    SSL: 'ssl',
    STL: 'stl',
    contain,
};

export const TIME_ENUM = {
    ONE_SECOND: 1000,
    FIVE_SECONDS: 5000,
    TEN_SECONDS: 10 * 1000,
    THIRTY_SECONDS: 30 * 1000,
    ONE_MINUTE: 60 * 1000,
    TWO_MINUTES: 2 * 60 * 1000,
    THREE_MINUTES: 3 * 60 * 1000,
    FIVE_MINUTES: 5 * 60 * 1000,
    TEN_MINUTES: 10 * 60 * 1000,
    ONE_HOUR: 60 * 60 * 1000,
    ONE_DAY: 24 * 60 * 60 * 1000,
    ONE_WEEK: 7 * 24 * 60 * 60 * 1000,
};
