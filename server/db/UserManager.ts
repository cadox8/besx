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

import {User} from "../../commons/api/user/User";
import {Database} from "./Database";
import {GameData} from "../api/GameData";
import {statSync} from "fs";
import {Utils} from "../utils/Utils";
import {InventoryItem, Item} from "../../commons/api/Item";

export class UserManager {

    public static getUser(internal_id: number, steam: string, discord: string): Promise<{ user: User, exists: boolean }> {
        return new Promise(async user => {
            const exists: boolean = await this.existUser(steam, discord);
            const result: { user: User, exists: boolean } = { user: exists ? await this.loadUser(internal_id, steam, discord) : await this.generateUser(internal_id, steam, discord), exists: exists }
            user(result);
        });
    }

    public static async generateUser(internal_id: number, steam: string, discord: string): Promise<User> {
        return new Promise(async user => {
            Database.database.query("insert into userdata (steam, discord) VALUES ('" + steam + "', '" + discord + "')", async (err, result) => {
               if (err) user(null);
            });
            user(await this.loadUser(internal_id, steam, discord));
        });
    }

    public static async loadUser(internal_id: number, steam: string, discord: string): Promise<User> {
        return new Promise(user => {
            Database.database.query("select * from userdata WHERE steam='" + steam + "' and discord='" + discord + "'", (err, result) => {
                if (err) user(null);
                const data: any = Utils.JSON(result)[0];
                const tempUser: User = new User(internal_id, data.id);

                tempUser.steam = steam;
                tempUser.discord = discord;

                tempUser.money = data.money;
                tempUser.bank = data.bank;
                tempUser.blackMoney = data.blackMoney;

                tempUser.job = GameData.getJob(data.job);
                tempUser.employer = data.employer;

                tempUser.rank = data.rank;

                Database.database.query("select * from stats where user_id='" + tempUser.db_id + "'", (stats_error, statsData) => {
                    Database.database.query("select * from inventory where user_id='" + tempUser.db_id + "'", (inv_error, invData) => {
                        if (!stats_error) {
                            const stats: any = Utils.JSON(statsData)[0];
                            tempUser.stats.weight = stats.weight;
                            tempUser.stats.diving = stats.diving;
                            tempUser.stats.resistance = stats.resistance;
                            tempUser.stats.stress = stats.stress;
                        }
                        if (!inv_error) {
                            const items: any = Utils.JSON(Utils.JSON(invData)[0]);
                            items.items.forEach(i => {
                                const item: Item = new Item(i.item.id, i.item.name, i.item.displayName, i.item.weight, Boolean(i.item.usable));
                                tempUser.inventory.add(new InventoryItem(item, i.amount))
                            })
                        }
                    });
                    user(tempUser);
                });
            });
        });
    }

    public static async existUser(steam: string, discord: string): Promise<boolean> {
        return new Promise(exists => {
            Database.database.query("SELECT id FROM userdata WHERE steam='" + steam + "' and discord='" + discord + "'", (err, result) => {
                exists(!err);
            });
        })
    }

    public static async saveUser(user: User): Promise<boolean> {
        return new Promise(saved => {
            Database.database.query("update userdata set money = ?, bank = ?, blankMoney = ?, job = ?, employer = ? where id = ?", [
                user.money,
                user.bank,
                user.blackMoney,
                user.job.id,
                user.employer,
                user.db_id
            ], (userError, userdata) => {
                Database.database.query("update stats set weight = ?, diving = ?, resistance = ?, stress = ? where user_id = ?", [
                    user.stats.weight,
                    user.stats.diving,
                    user.stats.resistance,
                    user.stats.stress,
                    user.db_id
                ], (statsError, stats) => {
                   Database.database.query("update inventory set items = ? where user_id = ?", [
                       '{items: ' + JSON.stringify(JSON.parse(user.inventory.json()).items) + '}'
                   ], (invError, inventory) => {
                       saved(!userError && !statsError && !invError);
                   });
                });
            });
        });
    }
}