import {PlayerEvent} from "./PlayerEvent";
import {User} from "../../../commons/api/User";
import {GameData} from "../../api/GameData";
import {ChatMessageEvent} from "../sender/ChatMessageEvent";

export class PlayerKickEvent extends PlayerEvent {

    private readonly reason: string;
    private readonly target: number;

    constructor(id: number, name: string, target: number, reason: string) {
        super(id, name);

        this.target = target;
        this.reason = reason;
    }

    protected event(): void {
        const user: User = GameData.findUser(this.target);

        if (this.emitter.rank >= user.rank) {
            new ChatMessageEvent(this.internal_id, [ 254, 49, 49 ], 'You can not kick this player because you are lower or equal rank');
            return;
        }

    }
}