import {BaseCommand, CommandType} from "../BaseCommand";
import {ChatMessageEvent} from "../../events/sender/ChatMessageEvent";
import {Prefix} from "../../../commons/utils/Prefix";
import {GameData} from "../../api/GameData";
import {Rank} from "../../../commons/api/user/User";

export class ReportCMD extends BaseCommand {

    constructor() {
        super('report', Rank.USER, CommandType.CLIENT);
    }

    public register(): void {
        RegisterCommand(this.command, async (source: number, args: string[]) => {
            if (source <= 0) return;
            const who: string = Prefix.REPORT + this.getUser(source).steamName;

            GameData.instance.users.filter(u => u.rank >= Rank.HELPER).forEach(user => new ChatMessageEvent(user.internal_id, [ 255, 255, 255 ], (!args ? 'Nil' : args.join(' ')), who));
        }, false);
    }
}