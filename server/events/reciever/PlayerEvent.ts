import {Server} from "../../Server";
import * as Cfx from 'fivem-js';
import {User} from "../../../commons/api/User";
import {GameData} from "../../api/GameData";

export abstract class PlayerEvent {

    protected readonly instance: Server;

    protected readonly internal_id: number;
    protected readonly name: string;

    protected readonly emitter: User;

    protected constructor(internal_id: number, name: string) {
        this.internal_id = internal_id;
        this.name = name;

        this.instance = Server.instance;

        this.emitter = GameData.findUser(this.internal_id);

        this.event();
    }

    protected abstract event(): void;
}