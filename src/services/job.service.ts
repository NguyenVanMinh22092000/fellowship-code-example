import { Job } from 'agenda';

import JobMgr from '../cores/job.mgr';

import { jobRepository } from '../repositories';

import { deleteFile } from '../utils';

import { JOB_NAMES, JOB_SERVICES, JOB_TYPES } from '../enums';

import { JobData } from '../models';
import { JobEntity } from '../models/mongo';
import { getFormatDate } from '../utils/date.util';
import { masterBillStatusFunction } from './masterbill_status_function.service';

const JobInstance = JobMgr.getInstance();

export class JobService {
    constructor() {
        console.log('🚀 init -> service-----> job');
    }

    init = async (): Promise<void> => {
        await JobInstance.init();
        JobInstance.define(JOB_NAMES.PROCESSING, this.handleProcessing);
        JobInstance.define(JOB_NAMES.MASTERBILL, this.handleMasterBill);
        JobInstance.start();
    };

    add = (name: string, executeTime: number, datas: JobData): void => {
        JobInstance.schedule(name, new Date(executeTime), datas);
    };

    get = async (sessionId: string, type?: string): Promise<any> => {
        const query: any = { ['data.sessionId']: sessionId };
        const job: JobEntity | null = await jobRepository.findOne(query);
        const { data } = job || {};
        const { data: _data } = (data || {}) as JobData;
        let result: any = job;
        switch (type) {
            case 'detail':
                result = data;
                break;
            case 'data':
                result = _data;
                break;

            default:
                break;
        }
        return result;
    };

    update = async (sessionId: string, newData?: any, executeTime?: number): Promise<boolean> => {
        const query: any = { ['data.sessionId']: sessionId };
        const jobs: JobEntity | null = await jobRepository.findOne(query);
        if (jobs) {
            const { _id, data, nextRunAt, name } = jobs as JobEntity;
            const { service, sessionId, type } = data as JobData;
            const runAtDate: Date = new Date(executeTime || nextRunAt);
            const newJobData: JobData = {
                service,
                sessionId,
                type,
                data: newData,
            };
            JobInstance.schedule(name, runAtDate, newJobData);
            const isSuccess: boolean = await jobRepository.delete(String(_id));
            return isSuccess;
        }
        return false;
    };

    delete = async (sessionId: string): Promise<any> => {
        return await jobRepository.deleteBySessionId(sessionId);
    };

    handleProcessing = async (job: Job<any>) => {
        const { attrs } = job || {};
        const { data: jobData } = attrs || {};
        const { service, type, data } = (jobData || {}) as JobData;
        switch (service) {
            case JOB_SERVICES.ORDER:
                switch (type) {
                    case JOB_TYPES.IMPORT_ERROR:
                        {
                            const { fileName } = data || {};
                            if (fileName) await deleteFile(fileName);
                        }
                        break;

                    default:
                        break;
                }
                break;
            case JOB_SERVICES.MASTERBILL:
                switch (type) {
                    case JOB_TYPES.EXPORT:
                        {
                            const { removeFile } = data || {};
                            if (removeFile) await deleteFile(removeFile);
                        }
                        break;

                    default:
                        break;
                }
                break;
            default:
                break;
        }
    };

    handleMasterBill = async (job: Job<any>) => {
        const { attrs } = job || {};
        const { data: jobData } = attrs || {};
        const { type, data } = (jobData || {}) as JobData;
        const time: string = getFormatDate('HH:mm:ss dd/MM/yyyy', new Date());
        console.log('job -> masterbill -> [time, data]', [time, jobData]);
        try {
            switch (type) {
                case JOB_TYPES.UPDATE_STATUS:
                    await masterBillStatusFunction.jobUpdateStatus(data);
                    break;

                default:
                    break;
            }
        } catch (error) {
            console.log('🌎 job -> masterbill -> error', error);
        }
    };
}

export const jobService = new JobService();
