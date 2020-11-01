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

import {createPool, MysqlError, Pool} from "mysql";
import {Log} from "../../commons/utils/Log";
import {Item} from "../../commons/api/Item";
import {GameData} from "../api/GameData";
import {UpdateItemsEvent} from "../events/sender/UpdateItemsEvent";

export class Database {

    private static _database: Pool;

    constructor(mysql: { host: string, port: number, user: string, password: string }, database: string) {
        Log.debug('Loading Database...');
        this.loadPool(mysql, database);
        Log.debug('Database Loaded!');
    }

    private loadPool(mysql: { host: string, port: number, user: string, password: string }, database: string): void {
        Database._database = createPool({
            host: mysql.host,
            port: mysql.port,
            user: mysql.user,
            password: mysql.password,
            database: database,
            multipleStatements: true
        });

        Database._database.on('error', (err: MysqlError) => Log.danger('[Database] ' + err.sqlMessage));
    }

    static get database(): Pool {
        return this._database;
    }

    public static addNewItem(item: Item): Promise<boolean> {
        return new Promise<boolean>(success => {
            if (GameData.instance.items.includes(item)) {
                success(false);
                return;
            }
            Database.database.query("insert into items(name, displayName, weight) values ('" + item.name + "', '" + item.displayName + "', '" + item.weight + "')", (err, result) => {
                if (!err) {
                    GameData.addItem(item);
                    new UpdateItemsEvent();
                }
                success(!err);
            });
        });
    }
}