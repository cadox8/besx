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

import {InventoryItem, Item} from "../Item";

export class Inventory {

    public items: InventoryItem[];

    public maxWeight: number;
    public totalWeight: number;

    constructor(maxWeight: number) {
        this.maxWeight = maxWeight;
        this.items = [];
        this.totalWeight = 0;
    }

    public add(item: InventoryItem): boolean {
        if (this.cant(item.item.weight * item.amount)) return false;

        if (this.has(item.item)) {
            this.items[this.items.findIndex(i => i.item.id === item.item.id)].amount += item.amount;
        } else {
            this.items.push(item);
        }
        this.calculateWeight();
        return true;
    }

    public remove(item: InventoryItem): boolean {
        if (!this.has(item.item)) return false;
        const index: number = this.items.findIndex(i => i.item.id === item.item.id);
        const result: number = this.get(item.item.id).amount - item.amount;

        if (result < 0) {
            return false;
        } else {
            if (result === 0) {
                this.items.splice(index, 1);
            } else {
                this.items[index].amount -= item.amount;
            }
        }
        this.calculateWeight();
        return true;
    }

    public get(id: number): InventoryItem {
        return this.items.find(i => i.item.id === id);
    }

    public has(item: Item): boolean {
        return this.hasId(item.id);
    }
    public hasId(id: number): boolean {
        return this.items.find(i => i.item.id === id) !== null;
    }

    private cant(weight: number): boolean {
        return this.totalWeight + weight > this.maxWeight;
    }

    private calculateWeight(): void {
        this.totalWeight = 0;
        this.items.forEach(i => this.totalWeight += (i.item.weight * i.amount));
    }

    public json(): string {
        return JSON.stringify(this);
    }
}