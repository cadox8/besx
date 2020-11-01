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
import {User} from "../../commons/api/user/User";
import {Game} from "fivem-js";
import {Item} from "../../commons/api/Item";
import {UpdateItemsEvent} from "../events/sender/UpdateItemsEvent";

export class GameData {

    public static instance: GameData;

    private internal_id_counter: number = 0;

    public readonly users: User[];
    public jobs: Job[];
    public items: Item[];

    constructor() {
        GameData.instance = this;
        this.users = [];
        this.jobs = [];
        this.items = [];
    }

    static lastItem(): number {
        return GameData.instance.items.reverse()[0].id;
    }

    static addItem(item: Item): void {
        GameData.instance.items.push(item);
        new UpdateItemsEvent();
    }
    static findItem(id: number): Item {
        return GameData.instance.items.find(u => u.id === id);
    }
    static findItemByName(name: string): Item {
        return GameData.instance.items.find(u => u.name === name);
    }
    static updateItem(item: Item): void {
        GameData.instance.items[this.indexItem(item)] = item;
    }
    private static indexItem(item: Item): number {
        return GameData.instance.items.indexOf(item);
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

    static removeUser(id: number): void {
        GameData.instance.users.splice(this.indexId(id), 1);
    }

    static findUser(internal_id: number): User {
        return GameData.instance.users.find(u => u.internal_id === internal_id);
    }

    private static index(user: User): number {
        return GameData.instance.users.indexOf(user);
    }
    private static indexId(id: number): number {
        return GameData.instance.users.findIndex(u => u.internal_id === id);
    }

    static updateUser(user: User): void {
        GameData.instance.users[this.index(user)] = user;
    }
}