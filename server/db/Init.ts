import {Employer, Job} from "../../commons/api/Job";
import {Database} from "./Database";
import {Log} from "../../commons/utils/Log";

export class Init {

    constructor() {
        Log.debug('Loading all data...');
    }

    public async loadJobs(): Promise<Job[]> {
        return new Promise(jobs => {
            const tempJobs: Job[] = [];
           Database.database.query("select * from jobs", (err, result) => {
               if (err) jobs(tempJobs);
               const jobData: any = JSON.parse(JSON.stringify(result));

               jobData.forEach(j => {
                   const job: Job = new Job(j.id, j.name);

                   Database.database.query("select * from jobs WHERE job='" + job.id + "'", (err2, result2) => {
                       if (err2) job.addRank(new Employer(1, 'Undefined'));
                       const emplData: any = JSON.parse(JSON.stringify(result2));

                       emplData.forEach(e => {
                           const empl: Employer = new Employer(e.id, e.name);
                           empl.salary = e.salary;
                           empl.boss = e.boss === 1;
                           job.addRank(empl);
                       })
                   });
                   tempJobs.push(job);
               });
               jobs(tempJobs);
           })
        });
    }
}