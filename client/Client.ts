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

import {User} from "../commons/api/User";
import {REvents} from "./events/REvents";
import {SEvents} from "./events/SEvents";

export class Client {

    private static _instance: Client;

    private _user: User;
    private readonly _sEvents: SEvents;

    constructor() {
        Client._instance = this;

        console.error('---------------- BESX ----------------');
        console.log('Loading everything...');
        new REvents();
        this._sEvents = new SEvents();
        console.log('Loaded!');
        console.error('---------------- BESX ----------------');
    }

    static get instance(): Client {
        return this._instance;
    }

    get user(): User {
        return this._user;
    }

    set user(value: User) {
        this._user = value;
    }

    get sEvents(): SEvents {
        return this._sEvents;
    }
}

const client: Client = new Client();