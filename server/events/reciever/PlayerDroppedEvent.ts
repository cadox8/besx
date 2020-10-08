import {PlayerEvent} from "./PlayerEvent";
import {GameData} from "../../api/GameData";
import {Log} from "../../../commons/utils/Log";

export class PlayerDroppedEvent extends PlayerEvent {

    private readonly reason: string;

    constructor(source: number, reason: string) {
        super(source, GameData.findUser(source).steamName);

        this.reason = reason;
    }

    protected event(): void {
        Log.normal(`Player ${this.name} disconnected: ${this.reason}`);
        GameData.removeUser(this.source);
    }
}