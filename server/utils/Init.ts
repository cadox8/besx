/*
 * Copyright (c) 2020 - cadox8
 *
 * All Rights Reserved
 *
 * That means:
 *
 * - You shall not use any piece of this software in a commercial product / service
 * - You shall not resell this software
 * - You shall not provide any facility to install this particular software in a commercial product / service
 * - If you redistribute this software, you must link to ORIGINAL repository at https://github.com/cadox8/besx
 * - This copyright should appear in every part of the project code
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

import {Employer, Job} from "../../commons/api/Job";
import {Database} from "../db/Database";
import {Log} from "../../commons/utils/Log";
import {HelpCMD} from "../commands/normal/HelpCMD";
import {IdCMD} from "../commands/normal/IdCMD";
import {DoCMD} from "../commands/normal/DoCMD";
import {MeCMD} from "../commands/normal/MeCMD";
import {ReportCMD} from "../commands/normal/ReportCMD";
import {KickCMD} from "../commands/admin/KickCMD";
import {Item} from "../../commons/api/Item";
import {Utils} from "./Utils";
import {CreateItemCMD} from "../commands/mod/CreateItemCMD";

export class Init {

    constructor() {
        Log.debug('Loading all data...');
    }

    public async loadCommands(): Promise<void> {
        Log.debug('Loading commands...');
        // Normal
        await new HelpCMD().register();
        await new IdCMD().register();
        await new DoCMD().register();
        await new MeCMD().register();
        await new ReportCMD().register();

        // mod
        await new CreateItemCMD().register();

        // Admin
        await new KickCMD().register();
    }

    public async loadItems(): Promise<Item[]> {
        Log.debug('Loading Items...');
        return new Promise(items => {
            const tempItems: Item[] = [];
            Database.database.query("select * from items", (err, result) => {
                const itemsData: any = Utils.JSON(result);
                itemsData.forEach(i => tempItems.push(new Item(i.id, i.name, i.displayName, i.weight, Boolean(i.usable))));
            });
            items(tempItems);
        });
    }

    public async loadJobs(): Promise<Job[]> {
        Log.debug('Loading jobs...');
        return new Promise(jobs => {
            const tempJobs: Job[] = [];
            Database.database.query("select * from jobs", (err, result) => {
               if (err) jobs(tempJobs);
               const jobData: any = JSON.parse(JSON.stringify(result));

               jobData.forEach(j => {
                   const job: Job = new Job(j.id, j.name);

                   Database.database.query("select * from employers WHERE job='" + job.id + "'", (err2, result2) => {
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
            });
        });
    }
}