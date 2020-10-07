import {Prefix} from "../../../commons/utils/Prefix";
import {GameData} from "../../api/GameData";

export class ChatMessageEvent {

    private readonly target: number;
    private readonly color: number[];
    private readonly prefix: string;
    private readonly msg: string;

    constructor(target: number, color: number[], msg: string, prefix: string = Prefix.BESX_DANGER) {
        this.target = target;
        this.color = color;
        this.prefix = prefix;
        this.msg = msg;

        this.event();
    }

    private event(): void {
        if (this.target === -1) {
            GameData.prototype.users.forEach(u => TriggerClientEvent('besx:showMessageOnChat', u.internal_id, this.color, this.prefix, this.msg));
        } else {
            TriggerClientEvent('besx:showMessageOnChat', this.target, this.color, this.prefix, this.msg);
        }
    }
}