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
import {ChatMessageEvent} from "../../events/sender/ChatMessageEvent";
import {Prefix} from "../../../commons/utils/Prefix";
import {GameData} from "../../api/GameData";
import {Rank} from "../../../commons/api/user/User";

export class ReportCMD extends BaseCommand {

    constructor() {
        super('report', Rank.USER, CommandType.CLIENT);
    }

    public async register(): Promise<void> {
        RegisterCommand(this.command, async (source: number, args: string[]) => {
            if (source <= 0) return;
            const who: string = Prefix.REPORT + this.getUser(source).steamName;

            GameData.instance.users.filter(u => u.rank >= Rank.HELPER).forEach(user => new ChatMessageEvent(user.internal_id, [ 255, 255, 255 ], (!args ? 'Nil' : args.join(' ')), who));
        }, false);
    }
}