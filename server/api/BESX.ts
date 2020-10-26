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

import {Item} from "../../commons/api/Item";
import {Database} from "../db/Database";
import {GameData} from "./GameData";
import {UpdateItemsEvent} from "../events/sender/UpdateItemsEvent";

export class BESX {

    /**
     * Register a new usable Item (not saved in database)
     * This will save the item in the database the first time and then adds the callback to the Item
     *
     *
     * @param item The item to register
     * @param callback The callback to be executed
     * @see Item
     */
    public static registerUsableItem(item: Item, callback: () => void): void {
        item.usable = true;
        item.callback = callback;
        Database.addNewItem(item);
        GameData.updateItem(item);
        new UpdateItemsEvent();
    }

    /**
     * Register a new usable Item previously saved on Database (if you entered it manually)
     *
     *
     * @param itemName The item name from the registered Item (column `name` on Database)
     * @param callback The callback to be executed
     * @see Item
     */
    public static registerUsableItemByName(itemName: string, callback: () => void): void {
        const item: Item = GameData.findItemByName(itemName);
        item.usable = true;
        item.callback = callback;
        Database.addNewItem(item);
        GameData.updateItem(item);
        new UpdateItemsEvent();
    }
}