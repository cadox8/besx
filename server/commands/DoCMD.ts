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

import {BaseCommand, CommandType} from "./BaseCommand";
import {GameData} from "../api/GameData";
import {Vector3} from "fivem-js";
import {ChatMessageEvent} from "../events/sender/ChatMessageEvent";

export class DoCMD extends BaseCommand {

    constructor() {
        super('do', 0, CommandType.CLIENT);
    }

    public register(): void {
        RegisterCommand(this.command, async (source: number, args: string[]) => {
            if (source <= 0 || this.type === CommandType.RCON) return;
            const point: number[] = GetEntityCoords(GetPlayerPed(String(source)));
            const pos: Vector3 = new Vector3(point[0], point[1], point[2]);

            GameData.instance.users.forEach(u => {
                const point2: number[] = GetEntityCoords(GetPlayerPed(String(u.internal_id)));
                const pos2: Vector3 = new Vector3(point2[0], point2[1], point2[2]);

                if (pos.distance(pos2) > 20.0) return;
                new ChatMessageEvent(-1, [ 255, 255, 255 ], (!args ? '' : args.join(' ')), '^3' + this.getUser(source).steamName); // Change Steam ID to Name
            });
        }, false);
    }
}