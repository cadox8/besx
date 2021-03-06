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

import {BaseCommand, CommandType} from "../BaseCommand";
import {Rank, User} from "../../../commons/api/user/User";
import {UserManager} from "../../db/UserManager";
import {ChatMessageEvent} from "../../events/sender/ChatMessageEvent";
import {Colors} from "../../../commons/utils/Colors";
import {Server} from "../../Server";

export class KickCMD extends BaseCommand {

    constructor() {
        super('kick', Rank.HELPER_PLUS, CommandType.CLIENT);
    }

    public async register(): Promise<void> {
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

            if (target.rank >= who.rank && Server.config.moderation.avoidRanks) {
                new ChatMessageEvent(who.internal_id, Colors.RED, 'You are the same or lower rank that the target and you can not kick him');
                return;
            }
            const reason: string = args.length > 1 ? args.join(' ') : 'You have been kicked from the server without any reason';

            if (!await UserManager.saveUser(target)) UserManager.saveUser(target);


            DropPlayer(String(target.internal_id), reason);
            new ChatMessageEvent(-1, Colors.WHITE, `The user ${target.steamName} has been kicked from server. Reason: ${reason}`)
        }, false);
    }
}