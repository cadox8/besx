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

import {Job} from "../Job";
import {Inventory} from "./Inventory";
import {Stats} from "./Stats";

export class User {

    // Internal
    public readonly internal_id: number;

    public readonly db_id: number;

    // Utils
    public steamName: string = '';
    public steam: string = '';
    public discord: string = '';

    // RP
    public money: number = 0;
    public bank: number = 0;
    public blackMoney: number = 0;

    // Data
    public stats: Stats = new Stats();
    public inventory: Inventory = new Inventory(25 + (this.stats.weight * 0.2));

    // Work
    // ToDo: Can be done better... In a near future
    public job: Job = null;
    public employer: number = 0;
    public working: boolean = false;

    // Administrative
    public rank: Rank = Rank.USER;

    /**
     * Creates an instance of User
     *
     * @param internal_id The internal (shown) id for changes inside program
     * @param db_id The Database id of the user
     */
    constructor(internal_id: number, db_id: number) {
        this.internal_id = internal_id;
        this.db_id = db_id;
    }

    //

    public toggleWork(): boolean {
        this.working = !this.working;
        return this.working;
    }

    public pay(): number {
        this.bank = this.bank + this.job.rank(this.employer).salary;
        return this.job.rank(this.employer).salary;
    }
}

export enum Rank {
    USER, VIP, HELPER, HELPER_PLUS, MODERATOR, ADMINISTRATOR, OWNER, DEVELOPER
}