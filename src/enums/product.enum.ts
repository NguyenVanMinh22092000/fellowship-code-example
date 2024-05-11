function contain(value: any) {
    /* @ts-ignore */
    return Object.values(this).includes(value);
}

export const PRODUCT_STATUS = {
    ACT: 'ACT',
    IAC: 'IAC',
    REJ: 'REJ',
    contain,
};
