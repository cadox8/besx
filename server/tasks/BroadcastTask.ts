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

import {GameData} from "../api/GameData";
import {Server} from "../Server";
import {PayDayEvent} from "../events/sender/PayDayEvent";
import {ChatMessageEvent} from "../events/sender/ChatMessageEvent";
import {Colors} from "../../commons/utils/Colors";
import {Messages} from "../../commons/data/Messages";

export class BroadcastTask {

    private readonly delay: number; // Seconds

    private index: number = 0;

    constructor(delay: number = 60 * 5) {
        this.delay = delay;
    }

    public run(): void {
        setInterval(async () => {
            new ChatMessageEvent(-1, Colors.WHITE, Messages.BROADCAST[this.index]);
            this.index++;
        }, this.delay * 1000);
    }
}