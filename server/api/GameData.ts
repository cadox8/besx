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

import {Job} from "../../commons/api/Job";
import {User} from "../../commons/api/User";
import {Game} from "fivem-js";

export class GameData {

    public static instance: GameData;

    private internal_id_counter: number = 0;

    private readonly _users: User[];
    private _jobs: Job[];

    constructor() {
        GameData.instance = this;
        this._users = [];
        this._jobs = [];
    }

    get users(): User[] {
        return this._users;
    }

    get jobs(): Job[] {
        return this._jobs;
    }

    set jobs(value: Job[]) {
        this._jobs = value;
    }

    static nextId(): number {
        GameData.instance.internal_id_counter++;
        return GameData.instance.internal_id_counter;
    }

    static getJob(id: number): Job {
        return GameData.instance.jobs.find(j => j.id === id);
    }

    static addUser(user: User): void {
        GameData.instance.users.push(user);
    }

    static findUser(internal_id: number): User {
        return GameData.instance.users.find(u => u.internal_id === internal_id);
    }

    private static index(user: User): number {
        return GameData.instance.users.indexOf(user);
    }

    static updateUser(user: User): void {
        GameData.instance.users[this.index(user)] = user;
    }
}