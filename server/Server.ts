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

import {Database} from "./db/Database";
import {GameData} from "./api/GameData";
import {Init} from "./utils/Init";
import {JobTask} from "./tasks/JobTask";
import {Updater} from "../commons/utils/Updater";

export class Server {

    private init: Init;

    private readonly database: Database;

    private readonly gameData: GameData;

    constructor() {
        console.log('---------------- BESX ----------------');
        console.log('Starting BESX...');
        this.init = new Init();
        new Updater().update();

        this.database = new Database({ host: '', user: '', port: 0, password: '', database: 'besx' });
        this.gameData = new GameData();

        this.init.loadJobs().then(jobs => this.gameData.jobs = jobs);
        this.init.loadCommands();
        this.init.loadItems().then(items => this.gameData.items = items);

        new JobTask().run();
        console.log('Started :D');
        console.log('---------------- BESX ----------------');
    }
}

const server: Server = new Server();