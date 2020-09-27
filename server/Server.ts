import {Database} from "./db/Database";
import {REvents} from "./events/REvents";
import {SEvents} from "./events/SEvents";
import {GameData} from "./api/GameData";
import {Init} from "./db/Init";
import {JobTask} from "./tasks/JobTask";
import {Updater} from "../commons/utils/Updater";

export class Server {

    private static _instance: Server;

    private _internal_count: number = 0;

    private init: Init;

    private readonly database: Database;

    private readonly _sEvents: SEvents;
    private readonly gameData: GameData;

    constructor() {
        console.log('---------------- BESX ----------------');
        this.init = new Init();
        new Updater().update();

        this.database = new Database({ host: '', user: '', port: 0, password: '', database: 'besx' });
        this.gameData = new GameData();

        this.init.loadJobs().then(jobs => this.gameData.jobs = jobs);

        new REvents();
        this._sEvents = new SEvents();

        new JobTask().run();
        console.log('Started :D');
    }

    static get instance(): Server {
        return this._instance;
    }

    get internal_count(): number {
        return this._internal_count;
    }

    set internal_count(value: number) {
        this._internal_count = value;
    }

    get sEvents(): SEvents {
        return this._sEvents;
    }
}

const server: Server = new Server();