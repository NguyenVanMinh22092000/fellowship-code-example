function contain(value: any) {
    /* @ts-ignore */
    return Object.values(this).includes(value);
}

export const BUSINESS_TYPE = {
    AGENT: 'AGENT',
    SELLER: 'SELLER',
    HEAD_OFFICE: 'HEAD_OFFICE',
    contain,
};
