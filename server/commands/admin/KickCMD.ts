import {BaseCommand, CommandType} from "../BaseCommand";
import {Rank, User} from "../../../commons/api/user/User";
import {PlayerKickEvent} from "../../events/sender/PlayerKickEvent";

export class KickCMD extends BaseCommand {

    constructor() {
        super('kick', Rank.HELPER_PLUS, CommandType.CLIENT);
    }

    public register(): void {
        RegisterCommand(this.command, async (source: number, args: string[]) => {
            if (source <= 0) return;
            const who: User = this.getUser(source);

            if (who.rank < this.rank) {
                this.noPermissions(source);
                return;
            }

            if (args.length === 0 || isNaN(parseInt(args[0]))) {

                return;
            }
            const target: User = this.getUser(Number(args[0]));
            args.splice(0, 1);
            const reason: string = args.length > 1 ? args.join(' ') : 'You have been kicked from the server without any reason';

            if (target.rank >= who.rank) {

                return;
            }
            new PlayerKickEvent(target.internal_id, reason);
        }, false);
    }
}