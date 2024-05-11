import {
    masterBillStatusLogRepository,
    masterbillRepository,
    orderLogRepository,
    orderRepository,
    orderStatusRepository,
} from '../repositories';

import { JobUpdateStatus } from '../models';
import { ACTION, BILL_STATUS } from '../enums';

export class MasterBillStatusFunction {
    constructor() {
        console.log('🚀 init -> service-----> masterbill status');
    }

    async jobUpdateStatus(data: JobUpdateStatus) {
        const { id, status, userInfo } = data || {};
        try {
            let existingBill = await masterbillRepository.findById(id);

            if (!existingBill) {
                return;
            }
            const { billStatus } = existingBill || {};
            if (+billStatus > +status) {
                return;
            }
            existingBill.billStatus = status;
            const updatedOne = await masterbillRepository.update(id, existingBill, userInfo);

            if (updatedOne) {
                const newStatusLog: any = {
                    masterBillId: id,
                    isSystem: true,
                    ...userInfo.modify,
                    prevStatus: billStatus,
                    newStatus: status,
                    changedDate: updatedOne.updatedDate,
                };
                await masterBillStatusLogRepository.create(newStatusLog, userInfo);
                await this.updateMasterBillStatus(id, status, userInfo);
            }
        } catch (error) {
            console.log('Error in updateStatus : ', error);
            return;
        }
    }

    async updateMasterBillStatus(masterBillId: string, billStatus: BILL_STATUS, userInfo: any): Promise<boolean> {
        try {
            const searchQuery: any = {
                isSetMasterBill: true,
                masterBillId: masterBillId,
                orderStatus: { $lt: billStatus },
            };

            const updatedDate = +new Date();
            const updateFields: any = { orderStatus: billStatus, updatedDate };

            const fitOrders = await orderRepository.searchAllSorted(searchQuery);

            const isUpdated = await orderRepository.updateMany(searchQuery, updateFields);

            if (isUpdated) {
                const updatedSearchQuery: any = { ...userInfo.modify, updatedDate };
                const updatedList = await orderRepository.searchAllSorted(updatedSearchQuery);

                if (updatedList) {
                    const listUpdatedIds = updatedList.map(({ _id }) => _id.toString());

                    for (const el of fitOrders) {
                        const orderId: string = el._id.toString();
                        if (listUpdatedIds.includes(orderId)) {
                            await orderLogRepository.create(
                                {
                                    orderId,
                                    action: ACTION.UPDATE,
                                    ...userInfo.modify,
                                    prevData: [{ name: 'orderStatus', value: el.orderStatus }],
                                    updatedData: [{ name: 'orderStatus', value: billStatus }],
                                },
                                userInfo,
                            );
                        }
                    }

                    const orderStatusQuery: any = {
                        orderId: { $in: listUpdatedIds },
                        statuses: { $not: { $elemMatch: { status: billStatus } } },
                    };

                    const pushFields: any = { statuses: { status: billStatus, time: updatedDate } };
                    await orderStatusRepository.push(orderStatusQuery, pushFields);
                }
            }

            return !!isUpdated;
        } catch (error) {
            console.error('Error in updateMasterBillStatus:', error);
            return false;
        }
    }
}

export const masterBillStatusFunction = new MasterBillStatusFunction();
