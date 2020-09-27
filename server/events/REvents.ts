import {User} from "../../commons/api/User";
import {Server} from "../Server";
import {SEvents} from "./SEvents";
import {Log} from "../../commons/utils/Log";
import {UserLoader} from "../db/UserLoader";
import {GameData} from "../api/GameData";

export class REvents {

    constructor() {
        this.events();
    }

    private events(): void {
        onNet('playerConnecting', async (name: string, setKickReason: any, deferrals: any) => {
            deferrals.defer();
            const player = global.source;

            setTimeout(async () => {
                deferrals.update(`Hello ${name}. Your steam ID is being checked.`);
                Log.debug(`Hello ${name}. Your steam ID is being checked.`);
                let data: { steam?: string, discord?: string } = {};

                for (let i = 0; i < GetNumPlayerIdentifiers(player); i++) {
                    const identifier = GetPlayerIdentifier(player, i);

                    if (identifier.includes('steam:')) data.steam = identifier;
                    if (identifier.includes('discord:')) data.discord = identifier;
                }

                // pretend to be a wait
                setTimeout(async () => {
                    if (data.steam === null || data.discord === null) {
                        deferrals.done("You are not connected to Steam or Discord.");
                    } else {
                        deferrals.done();
                        Server.instance.internal_count = Server.instance.internal_count + 1;
                        const user: User = await UserLoader.getUser(Server.instance.internal_count, data.steam, data.discord);
                        GameData.addUser(user);
                        new SEvents().createUser(user);
                    }
                }, 0);
            }, 0);
        });
    }
}