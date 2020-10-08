/*
 * Copyright (c) 2020 - cadox8
 *
 * All Rights Reserved
 *
 * That means:
 *
 * - You shall not use any piece of this software in a commercial product / service
 * - You shall not resell this software
 * - You shall not provide any facility to install this particular software in a commercial product / service
 * - If you redistribute this software, you must link to ORIGINAL repository at https://github.com/cadox8/besx
 * - This copyright should appear in every part of the project code
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

import {PlayerEvent} from "./PlayerEvent";
import {Log} from "../../../commons/utils/Log";
import {Server} from "../../Server";
import {User} from "../../../commons/api/user/User";
import {UserLoader} from "../../db/UserLoader";
import {GameData} from "../../api/GameData";
import {CreateUserEvent} from "../sender/CreateUserEvent";

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
            let data: { steam?: string, discord?: string, steamName: string } = { steamName: '' };

            for (let i = 0; i < GetNumPlayerIdentifiers(player); i++) {
                const identifier = GetPlayerIdentifier(player, i);

                data.steamName = GetPlayerIdentifier(player, 1);
                if (identifier.includes('steam:')) data.steam = identifier;
                if (identifier.includes('discord:')) data.discord = identifier;
            }

            // pretend to be a wait
            setTimeout(async () => {
                if (data.steam === null || data.discord === null) {
                    this.deferrals.done("You are not connected to Steam or Discord.");
                } else {
                    this.deferrals.done();
                    const user: { user: User, exists: boolean } = await UserLoader.getUser(GameData.nextId(), data.steam, data.discord);
                    user.user.steamName = data.steamName;
                    GameData.addUser(user.user);
                    new CreateUserEvent(this.source, user.user, user.exists);
                }
            }, 0);
        }, 0);
    }
}