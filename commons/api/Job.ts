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

export class Job {

    private readonly _id: number;
    private readonly _name: string;

    private readonly _ranks: Employer[];

    constructor(id: number, name: string) {
        this._id = id;
        this._name = name || 'Undefined';
        this._ranks = [];
    }

    public addRank(rank: Employer): void {
        this._ranks.push(rank);
    }

    public rank(id: number): Employer {
        return this.ranks.find(r => r.id === id);
    }

    public getBoss(): Employer {
        return this._ranks.find(r => r.boss);
    }

    get id(): number {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get ranks(): Employer[] {
        return this._ranks;
    }
}

export class Employer {

    private readonly _id: number;
    private readonly _name: string;
    private _salary: number;

    private _boss: boolean;

    constructor(id: number, name: string) {
        this._id = id;
        this._name = name;

        this._salary = 0;
        this._boss = false;
    }

    get id(): number {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get salary(): number {
        return this._salary;
    }

    set salary(value: number) {
        this._salary = value;
    }

    get boss(): boolean {
        return this._boss;
    }

    set boss(value: boolean) {
        this._boss = value;
    }
}