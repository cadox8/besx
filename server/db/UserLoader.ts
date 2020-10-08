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

export class UserLoader {

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
                const data: any = JSON.parse(JSON.stringify(result))[0];
                const tempUser: User = new User(internal_id, data.id);

                tempUser.steam = steam;
                tempUser.discord = discord;

                tempUser.money = data.money;
                tempUser.bank = data.bank;
                tempUser.blackMoney = data.blackMoney;

                tempUser.job = GameData.getJob(data.job);
                tempUser.employer = data.employer;

                tempUser.rank = data.rank;

                user(tempUser);
            });
        });
    }

    public static async existUser(steam: string, discord: string): Promise<boolean> {
        return new Promise(exists => {
            Database.database.query("SELECT id FROM userdata WHERE steam='" + steam + "' and discord='" + discord + "'", (err, result) => {
                if (err) {
                    exists(false);
                } else {
                    exists(true);
                }
            });
        })
    }
}