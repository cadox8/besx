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

import {NotificationType, Notification} from "fivem-js";

export class Notify {

    private handle: number;

    private readonly type: NotificationType;
    private readonly msg: string;

    constructor(msg: string, type: NotificationType) {
        this.msg = msg;
        this.type = type;
    }

    public show(texture: string, sender: string, subject: string): void {
        SetNotificationTextEntry("STRING");
        AddTextComponentString(this.msg);
        EndTextCommandThefeedPostMessagetext(texture, texture, true, this.type, sender, subject);
        this.handle = DrawNotification(true, true);
    }

    public hide(): void {
        new Notification(this.handle).hide();
    }
}