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
import {User} from "../../../commons/api/user/User";
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