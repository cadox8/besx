import {PlayerEvent} from "./PlayerEvent";
import {Log} from "../../../commons/utils/Log";
import {Server} from "../../Server";
import {User} from "../../../commons/api/User";
import {UserLoader} from "../../db/UserLoader";
import {GameData} from "../../api/GameData";
import {SEvents} from "../SEvents";

export class PlayerConnectingEvent extends PlayerEvent {

    private readonly setKickReason: any;
    private readonly deferrals: any

    constructor(name: string, setKickReason: any, deferrals: any) {
        super(-2, name); // -2 Because -1 will be the Admin
        this.setKickReason = setKickReason;
        this.deferrals = deferrals;
    }

    protected event(): void {
        this.deferrals.defer();
        const player = global.source;

        setTimeout(async () => {
            this.deferrals.update(`Hello ${this.name}. Your steam ID is being checked.`);
            Log.debug(`Hello ${this.name}. Your steam ID is being checked.`);
            let data: { steam?: string, discord?: string } = {};

            for (let i = 0; i < GetNumPlayerIdentifiers(player); i++) {
                const identifier = GetPlayerIdentifier(player, i);

                if (identifier.includes('steam:')) data.steam = identifier;
                if (identifier.includes('discord:')) data.discord = identifier;
            }

            // pretend to be a wait
            setTimeout(async () => {
                if (data.steam === null || data.discord === null) {
                    this.deferrals.done("You are not connected to Steam or Discord.");
                } else {
                    this.deferrals.done();
                    this.instance.internal_count = Server.instance.internal_count + 1;
                    const user: User = await UserLoader.getUser(Server.instance.internal_count, data.steam, data.discord);
                    GameData.addUser(user);
                    new SEvents().createUser(user);
                }
            }, 0);
        }, 0);
    }
}