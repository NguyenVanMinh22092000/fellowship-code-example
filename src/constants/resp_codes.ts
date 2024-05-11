export const AppRespCodes = {
    // Common
    SUCCESS: 9999,
    FAILURE: -9999,

    UNAUTHORIZED: 'Unauthorized',
    FORBIDDEN: 'Forbidden',

    ERROR_OCCURRED: 'error_occurred',
    AUTHORIZATION_REQUIRED: 'authorization_required',
    INVALID_AUTHORIZATION: 'invalid_authorization',
    NO_PERMISSION: 'no_permission',
    MISSING_PARAM: 'missing_param',
    INVALID_PARAM: 'invalid_param',
    INVALID_DATA: 'invalid_data',
    MODEL_NOT_FOUND: 'model_not_found',
    DATA_NOT_FOUND: 'data_not_found',
    SELLER_NOT_FOUND: 'seller_not_found',
    DATA_EXISTED: 'data_existed',
    NOT_ALLOWED: 'not_allowed',
    NOTTHING_TO_PRINT: 'not_thing_to_print',

    // User Codes;
    PHONE_NUMBER_USED: 'phone_number_used',
    WRONG_PASSWORD: 'wrong_password',
    USER_NOT_FOUND: 'user_not_found',
    CONFIG_NOT_FOUND: 'config_not_found',
    USER_EXISTED: 'user_existed',
    AGENT_EXISTED: 'agent_existed',
    COUNTRY_EXISTED: 'country_existed',
    COUNTRY_CODE_EXISTED: 'country_code_existed',
    SHIPPING_COMPANY_ID_EXISTED: 'shipping_company_id_existed',
    TRANSPORT_EXISTED: 'transport_existed',
    SELLER_EXISTED: 'seller_existed',
    USER_INACTIVE: 'user_inactive',
    INVALID_USER: 'invalid_user',
    INVALID_EMAIL: 'invalid_email',
    INVALID_STATUS: 'invalid_status',
    INVALID_PHONE_NUMBER: 'invalid_phone_number',
    INVALID_NEW_PASSWORD: 'invalid_new_password',
    INVALID_OLD_PASSWORD: 'invalid_old_password',
    ALREADY_ACTIVATED: 'already_activated',

    EMPTY_REPORT_DATA: 'empty_report_data',

    // Product codes;
    CANNOT_CREATE_PRODUCT: 'cannot_create_product',
    PRODUCT_NOT_FOUND: 'product_not_found',

    // Order codes;
    ORDER_NOT_FOUND: 'order_not_found',
    UNPERMITED_AGENT: 'unpermited_agent',
    CANNOT_FIND_GHN_INFO: 'cannot_find_ghn_info',
    DELIVERING_ORDER: 'delivering_order',
    INVALID_ORDER_STATUS: 'invalid_order_status',
    CANNOT_CANCEL_IN_DELIVERY_SERVICE: 'cannot_cancel_in_delivery_service',
    CANNOT_UPDATE_ORDER_WITH_DILIVERY_SERVICE: 'cannot_update_order_with_delivery_service',
    ORDER_INVALID: 'order_invalid',
    ORDERS_INVALID: 'orders_invalid',
    UNSUPPORTED_PLACE: 'unsupported_place',
    INVALID_PHONE: 'invalid_phone',
    INVALID_MEASURE: 'invalid_measure',
    // Masterbill
    RELEASED_MASTERBILL: 'released_masterbill',
    CANNOT_FIND_MASTERBILL: 'cannot_find_masterbill',
    THE_SAME_BILLNO: 'the_same_billNo',

    // Customer //
    EXISTING_CUSTOMER_PHONE_NUMBER: 'existing_customer_phone_number',

    // Agent //
    AGENT_NOT_FOUND: 'agent_not_found',

    // Country //
    CANNOT_FIND_COUNTRY_LIST: 'cannot_find_country_list',
    CANNOT_FIND_CURRENCY_LIST: 'cannot_find_currency_list',
};
