const adminEntries: [string, string[]][] = [
    [
        'order.list.view',
        [
            'POST|/order/search',
            'GET|/order/{id}',
            'POST|/order/get-by-masterbill',
            'POST|/order/completed-warehouse',
            '--------------------------',
        ],
    ],
    ['order.list.addnew', /*****************/ ['POST|/order/add', 'POST|/order/calculate-fee']],
    ['order.list.update', /*****************/ ['PUT|/order']],
    ['order.list.delete', /*****************/ ['DELETE|/order/{id}']],
    ['order.list.upload', /*****************/ ['POST|/order/import', 'GET|/order/import/session/{id}']],

    ['order.action.warehousing', /**********/ ['POST|/order/completed-warehouse']],
    ['order.action.print', /****************/ ['POST|/order/print-many', 'GET|/order/print-many/session/{id}']],
    ['order.action.tracking', /*************/ ['POST|/order/track']],
    ['order.action.ghn.webhook', /**********/ ['POST|/order/webhook-processor']],
    [
        'order.action.export',
        /***************/ [
            'POST|/order/export',
            'GET|/order/export/session/{id}',
            'GET|/order/export-by-masterbill/{id}',
            'GET|/order/export-by-masterbill/session/{id}',
        ],
    ],
    ['order.action.change_status', /********/ ['PUT|/order/update-status']],
    ['order.action.assign_master_bill', /***/ ['PUT|/order']],
    [
        'master_bill.list.view',
        [
            'POST|/masterbill/search',
            'GET|/masterbill/{id}',
            'GET|/masterbill/get-status-log/{id}',
            '-----------------------------------',
        ],
    ],
    ['master_bill.list.addnew', ['POST|/masterbill/add']],
    ['master_bill.list.update', ['PUT|/masterbill/edit']],
    ['master_bill.list.delete', ['POST|/masterbill/delete-many']],
    ['master_bill.list.upload', ['POST|/masterbill/import']],

    ['master_bill.action.change_status', /***/ ['POST|/masterbill/update-status']],
    ['master_bill.action.export', /**********/ ['POST|/masterbill/export', 'GET|/masterbill/export/session/{id}']],

    ['product.list.view', /********/ ['POST|/product/search', 'GET|/product/{id}', 'POST|/upload-file']],
    ['product.list.addnew', /******/ ['POST|/product/add']],
    ['product.list.update', /******/ ['PUT|/product/update']],
    ['product.list.delete', /******/ ['DELETE|/product/{id}']],
    ['product.list.upload', /******/ ['POST|/product/import']],

    ['product.action.approve', /***/ ['POST|/agent/product/update']],
    ['product.action.export', /****/ ['POST|/product/export']],

    ['customer.list.view', /*******/ ['POST|/customer/search', 'GET|/customer/{id}']],
    ['customer.list.addnew', /*****/ ['POST|/customer/add']],
    ['customer.list.update', /*****/ ['POST|/customer/update/{id}']],
    ['customer.list.delete', /*****/ ['DELETE|/customer/{id}']],

    [
        'setting.organization.view',
        [
            'POST|/classify/search',
            'GET|/classify/organization',
            'POST|/agent/search',
            'POST|/seller/search',
            'GET|/seller/get-all',
        ],
    ],
    ['setting.organization.addnew', ['POST|/agent/add', 'POST|/seller/add']],
    ['setting.organization.update', ['PUT|/agent/{id}', 'PUT|/seller/{id}']],
    ['setting.organization.delete', ['DELETE|/agent/{id}', 'DELETE|/seller/{id}']],

    [
        'setting.user.view',
        [
            'POST|/admin/user/search',
            'GET|/user/me',
            'GET|/user/{id}',
            'POST|/admin/user/get',
            '-----------------------',
        ],
    ],
    ['setting.user.addnew', ['POST|/admin/user/add']],
    [
        'setting.user.update',
        [
            'POST|/admin/user/update',
            'POST|/admin/user/reset-password',
            'POST|/admin/user/activate',
            '------------------------',
        ],
    ],
    ['setting.user.delete', /*********/ ['DELETE|/user/{id}']],

    ['setting.role.view', /***********/ ['POST|/role/search', 'GET|/role/get-all', 'GET|/role/{id}']],
    ['setting.role.addnew', /*********/ ['POST|/role/add']],
    ['setting.role.update', /*********/ ['PUT|/role/{id}']],
    ['setting.role.delete', /*********/ ['DELETE|/role/{id}']],

    ['setting.country.view', /********/ ['POST|/country/search', 'GET|/country/{id}']],
    ['setting.country.addnew', /******/ ['POST|/country/add']],
    ['setting.country.update', /******/ ['PUT|/country/{id}']],
    ['setting.country.delete', /******/ ['DELETE|/country/{id}']],

    ['setting.courier_number.view', /********/ ['POST|/delivery-number/search', 'GET|/delivery-number/{id}']],
    ['setting.courier_number.addnew', /******/ ['POST|/delivery-number/add']],
    ['setting.courier_number.update', /******/ ['PUT|/delivery-number/{id}']],
    ['setting.courier_number.delete', /******/ ['DELETE|/delivery-number/{id}']],

    ['setting.exchange_rate.view', /********/ ['POST|/currency-exchange/search', 'GET|/currency-exchange/{id}']],
    ['setting.exchange_rate.addnew', /******/ ['POST|/currency-exchange/add']],
    ['setting.exchange_rate.update', /******/ ['PUT|/currency-exchange/{id}']],
    ['setting.exchange_rate.delete', /******/ ['DELETE|/currency-exchange/{id}']],

    [
        'setting.shipping_company.view',
        [
            'POST|/local-shipmnent/search',
            'GET|/local-shipmnent/{id}',
            'POST|/config/add',
            '------------------------------',
        ],
    ],
    ['setting.shipping_company.addnew', ['POST|/local-shipmnent/add']],
    ['setting.shipping_company.update', ['PUT|/local-shipmnent/{id}']],
    ['setting.shipping_company.delete', ['DELETE|/local-shipmnent/{id}']],

    [
        'setting.transport.view',
        [
            'POST|/transport-code/search',
            'GET|/transport-code/get-all',
            'GET|/transport-code/{id}',
            '--------------------------',
        ],
    ],
    ['setting.transport.addnew', ['POST|/transport-code/add']],
    ['setting.transport.update', ['PUT|/transport-code/{id}']],
    ['setting.transport.delete', ['DELETE|/transport-code/{id}']],
    ['setting.country.get_list', ['POST|/config/division-country/get-list']],

    [
        'setting.general_configuration.email',
        [
            'POST|/email/search',
            'POST|/email/add',
            'POST|/email/test',
            'GET|/email/{id}',
            'DELETE|/email/{id}',
            'PUT|/email/{id}',
            '---------------',
        ],
    ],
    [
        'setting.general_configuration.api_intergrate',
        [
            'POST|/intergrate/search',
            'POST|/intergrate/add',
            'GET|/intergrate/{id}',
            'DELETE|/intergrate/{id}',
            'PUT|/intergrate/{id}',
        ],
    ],

    [
        'account.general.information',
        [
            'GET|/user/me',
            'POST|/admin/user/update',
            'GET|/agent/{id}',
            'GET|/seller/{id}',
            'PUT|/agent/{id}',
            'PUT|/seller/{id}',
        ],
    ],
    ['account.general.change_password', ['POST|/admin/user/reset-password']],

    [
        'role.default',
        [
            'POST|/country/get-all',
            'GET|/delivery-number/get-all',
            'GET|/country/code/{code}',
            'GET|/currency-exchange/get-all',
            'GET|/transport-code/get-all',
            'GET|/seller/get-all',
            'GET|/agent/{id}',
            'GET|/seller/{id}',
            'GET|/config/view-layout',
            'PUT|/config/view-layout',
            'PUT|/config/view-layout/update',
            'GET|/local-shipmnent/get-all',
            'POST|/config/division-country/get-list',
            'GET|/env',
        ],
    ],
];

export const ADMIN_ROLE_FUNCTION_MAP = new Map<string, string[]>(adminEntries);

const agentEntries: [string, string[]][] = [
    [
        'order.list.view',
        [
            'POST|/order/search',
            'GET|/order/{id}',
            'POST|/order/get-by-masterbill',
            'POST|/order/completed-warehouse',
            '--------------------------',
        ],
    ],
    ['order.list.addnew', /*****************/ ['POST|/order/add', 'POST|/order/calculate-fee']],
    ['order.list.update', /*****************/ ['PUT|/order']],
    ['order.list.delete', /*****************/ ['DELETE|/order/{id}']],
    ['order.list.upload', /*****************/ ['POST|/order/import', 'GET|/order/import/session/{id}']],

    ['order.action.warehousing', /**********/ ['POST|/order/completed-warehouse']],
    [
        'order.action.print',
        /****************/ ['GET|/order/print/{id}', 'POST|/order/print-many', 'GET|/order/print-many/session/{id}'],
    ],
    ['order.action.tracking', /*************/ ['POST|/order/track']],
    ['order.action.ghn.webhook', /**********/ ['POST|/order/webhook-processor']],
    [
        'order.action.export',
        /***************/ [
            'POST|/order/export',
            'GET|/order/export/session/{id}',
            'GET|/order/export-by-masterbill/{id}',
            'GET|/order/export-by-masterbill/session/{id}',
        ],
    ],
    ['order.action.change_status', /********/ ['PUT|/order/update-status']],
    ['order.action.assign_master_bill', /***/ ['PUT|/order']],
    [
        'master_bill.list.view',
        [
            'POST|/masterbill/search',
            'GET|/masterbill/{id}',
            'GET|/masterbill/get-status-log/{id}',
            '-----------------------------------',
        ],
    ],
    ['master_bill.list.addnew', ['POST|/masterbill/add']],
    ['master_bill.list.update', ['PUT|/masterbill/edit']],
    ['master_bill.list.delete', ['DELETE|/masterbill/{id}']],
    ['master_bill.list.upload', ['POST|/masterbill/import']],

    ['master_bill.action.change_status', /***/ ['POST|/masterbill/update-status']],
    ['master_bill.action.export', /**********/ ['POST|/masterbill/export', 'GET|/masterbill/export/session/{id}']],

    ['product.list.view', /********/ ['POST|/product/search', 'GET|/product/{id}', 'POST|/upload-file']],
    ['product.list.addnew', /******/ ['POST|/product/add']],
    ['product.list.update', /******/ ['PUT|/product/update']],
    ['product.list.delete', /******/ ['DELETE|/product/{id}']],
    ['product.list.upload', /******/ ['POST|/product/import']],

    ['product.action.approve', /***/ ['POST|/agent/product/update']],
    ['product.action.export', /****/ ['POST|/product/export']],

    ['customer.list.view', /*******/ ['POST|/customer/search', 'GET|/customer/{id}']],
    ['customer.list.addnew', /*****/ ['POST|/customer/add']],
    ['customer.list.update', /*****/ ['POST|/customer/update/{id}']],
    ['customer.list.delete', /*****/ ['DELETE|/customer/{id}']],

    [
        'setting.organization.view',
        [
            'POST|/classify/search',
            'GET|/classify/organization',
            'POST|/agent/search',
            'POST|/seller/search',
            'GET|/seller/get-all',
        ],
    ],
    ['setting.organization.addnew', ['POST|/agent/add', 'POST|/seller/add']],
    ['setting.organization.update', ['PUT|/agent/{id}', 'PUT|/seller/{id}']],
    ['setting.organization.delete', ['DELETE|/agent/{id}', 'DELETE|/seller/{id}']],

    [
        'setting.user.view',
        [
            'POST|/admin/user/search',
            'GET|/user/me',
            'GET|/user/{id}',
            'POST|/admin/user/get',
            '-----------------------',
        ],
    ],
    ['setting.user.addnew', ['POST|/admin/user/add']],
    [
        'setting.user.update',
        [
            'POST|/admin/user/update',
            'POST|/admin/user/reset-password',
            'POST|/admin/user/activate',
            '------------------------',
        ],
    ],
    ['setting.user.delete', /*********/ ['DELETE|/user/{id}']],

    ['setting.role.view', /***********/ ['POST|/role/search', 'GET|/role/get-all', 'GET|/role/{id}']],
    ['setting.role.addnew', /*********/ ['POST|/role/add']],
    ['setting.role.update', /*********/ ['PUT|/role/{id}']],
    ['setting.role.delete', /*********/ ['DELETE|/role/{id}']],

    ['setting.country.view', /********/ ['POST|/country/search', 'GET|/country/{id}']],
    ['setting.country.addnew', /******/ ['POST|/country/add']],
    ['setting.country.update', /******/ ['PUT|/country/{id}']],
    ['setting.country.delete', /******/ ['DELETE|/country/{id}']],

    ['setting.courier_number.view', /********/ ['POST|/delivery-number/search', 'GET|/delivery-number/{id}']],
    ['setting.courier_number.addnew', /******/ ['POST|/delivery-number/add']],
    ['setting.courier_number.update', /******/ ['PUT|/delivery-number/{id}']],
    ['setting.courier_number.delete', /******/ ['DELETE|/delivery-number/{id}']],

    ['setting.exchange_rate.view', /********/ ['POST|/currency-exchange/search', 'GET|/currency-exchange/{id}']],
    ['setting.exchange_rate.addnew', /******/ ['POST|/currency-exchange/add']],
    ['setting.exchange_rate.update', /******/ ['PUT|/currency-exchange/{id}']],
    ['setting.exchange_rate.delete', /******/ ['DELETE|/currency-exchange/{id}']],

    [
        'setting.shipping_company.view',
        [
            'POST|/local-shipmnent/search',
            'GET|/local-shipmnent/{id}',
            'POST|/config/add',
            '------------------------------',
        ],
    ],
    ['setting.shipping_company.addnew', ['POST|/local-shipmnent/add']],
    ['setting.shipping_company.update', ['PUT|/local-shipmnent/{id}']],
    ['setting.shipping_company.delete', ['DELETE|/local-shipmnent/{id}']],

    [
        'setting.transport.view',
        [
            'POST|/transport-code/search',
            'GET|/transport-code/get-all',
            'GET|/transport-code/{id}',
            '--------------------------',
        ],
    ],
    ['setting.transport.addnew', ['POST|/transport-code/add']],
    ['setting.transport.update', ['PUT|/transport-code/{id}']],
    ['setting.transport.delete', ['DELETE|/transport-code/{id}']],
    ['setting.country.get_list', ['POST|/config/division-country/get-list']],

    [
        'setting.general_configuration.email',
        [
            'POST|/email/search',
            'POST|/email/test',
            'POST|/email/add',
            'GET|/email/{id}',
            'DELETE|/email/{id}',
            'PUT|/email/{id}',
            '---------------',
        ],
    ],
    [
        'setting.general_configuration.api_intergrate',
        [
            'POST|/intergrate/search',
            'POST|/intergrate/add',
            'GET|/intergrate/{id}',
            'DELETE|/intergrate/{id}',
            'PUT|/intergrate/{id}',
        ],
    ],

    [
        'account.general.information',
        [
            'GET|/user/me',
            'GET|/account/seller/{id}',
            'POST|/admin/user/update',
            'GET|/agent/{id}',
            'GET|/seller/{id}',
            'PUT|/agent/{id}',
            'PUT|/seller/{id}',
        ],
    ],
    ['account.general.change_password', ['POST|/admin/user/reset-password']],

    [
        'role.default',
        [
            'POST|/country/get-all',
            'GET|/delivery-number/get-all',
            'GET|/country/code/{code}',
            'GET|/env',
            'GET|/currency-exchange/get-all',
            'GET|/transport-code/get-all',
            'GET|/seller/get-all',
            'GET|/agent/{id}',
            'GET|/seller/{id}',
            'GET|/config/view-layout',
            'PUT|/config/view-layout',
            'PUT|/config/view-layout/update',
            'GET|/local-shipmnent/get-all',
            'POST|/config/division-country/get-list',
        ],
    ],
];

export const AGENT_ROLE_FUNCTION_MAP = new Map<string, string[]>(agentEntries);

const sellerEntries: [string, string[]][] = [
    [
        'order.list.view',
        [
            'POST|/order/search',
            'GET|/order/{id}',
            'POST|/order/get-by-masterbill',
            'POST|/order/completed-warehouse',
            '--------------------------',
        ],
    ],
    ['order.list.addnew', /*****************/ ['POST|/order/add', 'POST|/order/calculate-fee']],
    ['order.list.update', /*****************/ ['PUT|/order']],
    ['order.list.delete', /*****************/ ['DELETE|/order/{id}']],
    ['order.list.upload', /*****************/ ['POST|/order/import', 'GET|/order/import/session/{id}']],

    ['order.action.warehousing', /**********/ ['POST|/order/completed-warehouse']],
    [
        'order.action.print',
        /****************/ ['GET|/order/print/{id}', 'POST|/order/print-many', 'GET|/order/print-many/session/{id}'],
    ],
    ['order.action.tracking', /*************/ ['POST|/order/track']],
    ['order.action.ghn.webhook', /**********/ ['POST|/order/webhook-processor']],
    [
        'order.action.export',
        /***************/ [
            'POST|/order/export',
            'GET|/order/export/session/{id}',
            'GET|/order/export-by-masterbill/{id}',
            'GET|/order/export-by-masterbill/session/{id}',
        ],
    ],
    ['order.action.change_status', /********/ ['PUT|/order/update-status']],
    ['order.action.assign_master_bill', /***/ ['PUT|/order']],
    [
        'master_bill.list.view',
        [
            'POST|/masterbill/search',
            'GET|/masterbill/{id}',
            'GET|/masterbill/get-status-log/{id}',
            '-----------------------------------',
        ],
    ],
    ['master_bill.list.addnew', ['POST|/masterbill/add']],
    ['master_bill.list.update', ['PUT|/masterbill/edit']],
    ['master_bill.list.delete', ['DELETE|/masterbill/{id}']],
    ['master_bill.list.upload', ['POST|/masterbill/import']],

    ['master_bill.action.change_status', /***/ ['POST|/masterbill/update-status']],
    ['master_bill.action.export', /**********/ ['POST|/masterbill/export']],

    ['product.list.view', /********/ ['POST|/product/search', 'GET|/product/{id}', 'POST|/upload-file']],
    ['product.list.addnew', /******/ ['POST|/product/add']],
    ['product.list.update', /******/ ['PUT|/product/update']],
    ['product.list.delete', /******/ ['DELETE|/product/{id}']],
    ['product.list.upload', /******/ ['POST|/product/import']],

    ['product.action.approve', /***/ ['POST|/agent/product/update']],
    ['product.action.export', /****/ ['POST|/product/export']],

    ['customer.list.view', /*******/ ['POST|/customer/search', 'GET|/customer/{id}']],
    ['customer.list.addnew', /*****/ ['POST|/customer/add']],
    ['customer.list.update', /*****/ ['POST|/customer/update/{id}']],
    ['customer.list.delete', /*****/ ['DELETE|/customer/{id}']],

    [
        'setting.organization.view',
        [
            'POST|/classify/search',
            'GET|/classify/organization',
            'POST|/agent/search',
            'POST|/seller/search',
            'GET|/seller/get-all',
        ],
    ],
    ['setting.organization.addnew', ['POST|/agent/add', 'POST|/seller/add']],
    ['setting.organization.update', ['PUT|/agent/{id}', 'PUT|/seller/{id}']],
    ['setting.organization.delete', ['DELETE|/agent/{id}', 'DELETE|/seller/{id}']],

    [
        'setting.user.view',
        [
            'POST|/admin/user/search',
            'GET|/user/me',
            'GET|/user/{id}',
            'POST|/admin/user/get',
            '-----------------------',
        ],
    ],
    ['setting.user.addnew', ['POST|/admin/user/add']],
    [
        'setting.user.update',
        [
            'POST|/admin/user/update',
            'POST|/admin/user/reset-password',
            'POST|/admin/user/activate',
            '------------------------',
        ],
    ],
    ['setting.user.delete', /*********/ ['DELETE|/user/{id}']],

    ['setting.role.view', /***********/ ['POST|/role/search', 'GET|/role/get-all', 'GET|/role/{id}']],
    ['setting.role.addnew', /*********/ ['POST|/role/add']],
    ['setting.role.update', /*********/ ['PUT|/role/{id}']],
    ['setting.role.delete', /*********/ ['DELETE|/role/{id}']],

    ['setting.country.view', /********/ ['POST|/country/search', 'GET|/country/{id}']],
    ['setting.country.addnew', /******/ ['POST|/country/add']],
    ['setting.country.update', /******/ ['PUT|/country/{id}']],
    ['setting.country.delete', /******/ ['DELETE|/country/{id}']],

    ['setting.courier_number.view', /********/ ['POST|/delivery-number/search', 'GET|/delivery-number/{id}']],
    ['setting.courier_number.addnew', /******/ ['POST|/delivery-number/add']],
    ['setting.courier_number.update', /******/ ['PUT|/delivery-number/{id}']],
    ['setting.courier_number.delete', /******/ ['DELETE|/delivery-number/{id}']],

    ['setting.exchange_rate.view', /********/ ['POST|/currency-exchange/search', 'GET|/currency-exchange/{id}']],
    ['setting.exchange_rate.addnew', /******/ ['POST|/currency-exchange/add']],
    ['setting.exchange_rate.update', /******/ ['PUT|/currency-exchange/{id}']],
    ['setting.exchange_rate.delete', /******/ ['DELETE|/currency-exchange/{id}']],

    [
        'setting.shipping_company.view',
        [
            'POST|/local-shipmnent/search',
            'GET|/local-shipmnent/{id}',
            'POST|/config/add',
            '------------------------------',
        ],
    ],
    ['setting.shipping_company.addnew', ['POST|/local-shipmnent/add']],
    ['setting.shipping_company.update', ['PUT|/local-shipmnent/{id}']],
    ['setting.shipping_company.delete', ['DELETE|/local-shipmnent/{id}']],

    [
        'setting.transport.view',
        [
            'POST|/transport-code/search',
            'GET|/transport-code/get-all',
            'GET|/transport-code/{id}',
            '--------------------------',
        ],
    ],
    ['setting.transport.addnew', ['POST|/transport-code/add']],
    ['setting.transport.update', ['PUT|/transport-code/{id}']],
    ['setting.transport.delete', ['DELETE|/transport-code/{id}']],
    ['setting.country.get_list', ['POST|/config/division-country/get-list']],

    [
        'setting.general_configuration.email',
        [
            'POST|/email/search',
            'POST|/email/test',
            'POST|/email/add',
            'GET|/email/{id}',
            'DELETE|/email/{id}',
            'PUT|/email/{id}',
            '---------------',
        ],
    ],
    [
        'setting.general_configuration.api_intergrate',
        [
            'POST|/intergrate/search',
            'POST|/intergrate/add',
            'GET|/intergrate/{id}',
            'DELETE|/intergrate/{id}',
            'PUT|/intergrate/{id}',
        ],
    ],

    [
        'account.general.information',
        ['GET|/user/me', 'POST|/admin/user/update', 'GET|/seller/{id}', 'PUT|/seller/{id}'],
    ],
    ['account.general.change_password', ['POST|/admin/user/reset-password']],

    [
        'role.default',
        [
            'POST|/country/get-all',
            'GET|/delivery-number/get-all',
            'GET|/country/code/{code}',
            'GET|/currency-exchange/get-all',
            'GET|/transport-code/get-all',
            'GET|/seller/get-all',
            'GET|/agent/{id}',
            'GET|/seller/{id}',
            'GET|/config/view-layout',
            'PUT|/config/view-layout',
            'PUT|/config/view-layout/update',
            'GET|/local-shipmnent/get-all',
            'POST|/config/division-country/get-list',
            'GET|/env',
        ],
    ],
];

export const SELLER_ROLE_FUNCTION_MAP = new Map<string, string[]>(sellerEntries);
