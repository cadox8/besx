import {User} from "../commons/api/User";
import {REvents} from "./events/REvents";
import {SEvents} from "./events/SEvents";

export class Client {

    private static _instance: Client;

    private _user: User;
    private readonly _sEvents: SEvents;

    constructor() {
        Client._instance = this;

        console.error('---------------- BESX ----------------');
        console.log('Loading everything...');
        new REvents();
        this._sEvents = new SEvents();
        console.log('Loaded!');
        console.error('---------------- BESX ----------------');
    }

    static get instance(): Client {
        return this._instance;
    }

    get user(): User {
        return this._user;
    }

    set user(value: User) {
        this._user = value;
    }

    get sEvents(): SEvents {
        return this._sEvents;
    }
}

const client: Client = new Client();