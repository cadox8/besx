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

    public readonly id: number;
    public readonly name: string;
    public deposit: number;

    public readonly ranks: Employer[];

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name || 'Undefined';
        this.deposit = 0;
        this.ranks = [];
    }

    public addRank(rank: Employer): void {
        this.ranks.push(rank);
    }

    public rank(id: number): Employer {
        return this.ranks.find(r => r.id === id);
    }

    public getBoss(): Employer {
        return this.ranks.find(r => r.boss);
    }
}

export class Employer {

    public readonly id: number;
    public readonly name: string;
    public salary: number;

    public boss: boolean;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;

        this.salary = 0;
        this.boss = false;
    }
}