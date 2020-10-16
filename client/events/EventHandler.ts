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

import {User} from "../../commons/api/user/User";
import {Client} from "../Client";
import {Notify} from "../utils/Notify";
import {NotificationType} from "fivem-js";
import {Texture} from "../utils/Texture";
import {Item} from "../../commons/api/Item";

export class EventHandler {

    public handle(): void {
        onNet('besx:generatePlayer', (user: User, needSetup: boolean) => {
            Client.instance.user = user;
            if (needSetup) {

            }
        });

        onNet('besx:payday', (amount: number, user: User) => {
            Client.instance.user = user;
            const notification: Notify = new Notify(`You recieved ${amount}$ from the Goverment`, NotificationType.Default);
            notification.show(Texture.CHAR_BANK_MAZE, 'Maze Bank', '');
            setTimeout(() => notification.hide(), 1000 * 4);
        });

        onNet('besx:items', (items: Item[]) => Client.instance.items = items);
        onNet('besx:user', (user: User) => Client.instance.user = user);
    }
}