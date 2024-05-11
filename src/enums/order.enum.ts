export enum ORDER_STATUS {
    READY_FOR_WAREHOUSING = '100',
    COMPLETION_OF_THE_WAREHOUSING = '200',
    HOLD = '201',
    BE_RELEASED = '300',
    AIRCRAFT_DEPARTURE = '400',
    AIRCRAFT_ARRIVAL = '500',
    CUSTOMERS_PROCESSING = '600',
    RELEASED_CUSTOMERS = '700',
    START_DELIVERY = '800',
    RETURN_DELIVERY_COMPLETE = '900',
    COMPLETION_OF_THE_DELIVERY = '1000',
    SUSPENDED = '1100',
    CANCELL = '1200',
    FAILED_DELIVERY = '1300',
}

export const getOrderStatusName = (status: string) => {
    switch (status) {
        case ORDER_STATUS.READY_FOR_WAREHOUSING:
            return 'Ready for warehousing';
        case ORDER_STATUS.COMPLETION_OF_THE_WAREHOUSING:
            return 'Completion of the warehousing';
        case ORDER_STATUS.HOLD:
            return 'Hold';
        case ORDER_STATUS.BE_RELEASED:
            return 'Be released';
        case ORDER_STATUS.AIRCRAFT_DEPARTURE:
            return 'Aircraft departure';
        case ORDER_STATUS.AIRCRAFT_ARRIVAL:
            return 'Shipping Arrive';
        case ORDER_STATUS.CUSTOMERS_PROCESSING:
            return 'Customs Processing';
        case ORDER_STATUS.RELEASED_CUSTOMERS:
            return 'Released customs';
        case ORDER_STATUS.START_DELIVERY:
            return 'Start devivery';
        case ORDER_STATUS.RETURN_DELIVERY_COMPLETE:
            return 'Return delivery complete';
        case ORDER_STATUS.COMPLETION_OF_THE_DELIVERY:
            return 'Completion Of Delivery';
        case ORDER_STATUS.SUSPENDED:
            return 'Suspended';
        case ORDER_STATUS.CANCELL:
            return 'Canceled';
        case ORDER_STATUS.FAILED_DELIVERY:
            return 'Failed delivery';
        default:
            return '';
    }
};
