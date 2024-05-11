import { Job, Agenda } from 'agenda';

import { Configs } from '../constants';
import { JobData } from '../models';

class JobMgr {
    static instance: any = null;
    static agenda: Agenda | null = null;
    static isStart: boolean = false;

    static getInstance() {
        if (!JobMgr.instance) JobMgr.instance = new JobMgr();
        return JobMgr.instance;
    }

    init = async () => {
        if (JobMgr.isStart) return;
        try {
            const agenda = new Agenda({
                db: { address: Configs.DATABASE, collection: 'job' },
                processEvery: '5 seconds',
                defaultConcurrency: 1000,
            });
            if (agenda) {
                JobMgr.agenda = agenda;
                console.log('Init job successful!!!');
            }
        } catch (error) {
            console.log('StaInitrt job failure!!!');
        }
    };

    define = (name: string, onCallback: Function) => {
        if (JobMgr.isStart) return;
        if (JobMgr.agenda) {
            JobMgr.agenda.define<any>(name, async (job: Job<any>) => {
                await onCallback(job);
                job.remove();
            });
        }
    };

    start = () => {
        if (JobMgr.agenda && !JobMgr.isStart) {
            JobMgr.agenda.on('ready', () => {
                JobMgr.isStart = true;
                console.log('Job ready!!!');
                JobMgr.agenda?.start();
            });
        }
    };

    schedule = async (name: string, executeTime: Date, datas: JobData) => {
        if (JobMgr.agenda && JobMgr.isStart) {
            await JobMgr.agenda.schedule(executeTime, name, datas);
        }
    };
}

export default JobMgr;
