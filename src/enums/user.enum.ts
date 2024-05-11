function contain(value: any) {
    /* @ts-ignore */
    return Object.values(this).includes(value);
}

export const USER_STATUS = {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    contain,
};

export const USER_TYPE = {
    NORMAL: 'NORMAL',
    ADMIN: 'ADMIN',
    AGENT: 'AGENT',
    SELLER: 'SELLER',
    contain,
};
