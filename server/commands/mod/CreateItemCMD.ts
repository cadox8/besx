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
import {Rank} from "../../../commons/api/user/User";
import {Database} from "../../db/Database";
import {Item} from "../../../commons/api/Item";
import {GameData} from "../../api/GameData";
import {ChatMessageEvent} from "../../events/sender/ChatMessageEvent";
import {Colors} from "../../../commons/utils/Colors";
import {Prefix} from "../../../commons/utils/Prefix";

export class CreateItemCMD extends BaseCommand {

    constructor() {
        super('createitem', Rank.MODERATOR, CommandType.BOTH);
    }

    public async register(): Promise<void> {
        RegisterCommand(this.command, async (source: number, args: string[]) => {
            if (source <= 0) return;
            if (args.length < 2 || args.length > 3) {
                new ChatMessageEvent(source, Colors.WHITE, 'To much or many arguments!', Prefix.BESX_DANGER)
                return;
            }
            const created: boolean = await Database.addNewItem(new Item(GameData.lastItem() + 1, args[0], args[1], (!args[2] ? 0.0 : Number(args[2]))));

            if (created) {
                new ChatMessageEvent(source, Colors.WHITE, 'Item created successfully!!', Prefix.BESX);
            } else {
                new ChatMessageEvent(source, Colors.WHITE, 'An error occurred while creating the item', Prefix.BESX_DANGER);
            }
        }, false);
    }
}