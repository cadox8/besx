import {User} from "../../commons/api/User";
import {Database} from "./Database";
import {Server} from "../Server";
import {GameData} from "../api/GameData";

export class UserLoader {

    public static getUser(internal_id: number, steam: string, discord: string): Promise<User> {
        return new Promise(async user => {
            const exists: boolean = await this.existUser(steam, discord);
            user(exists ? await this.loadUser(internal_id, steam, discord) : await this.generateUser(internal_id, steam, discord));
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
                const tempUser: User = new User(Server.instance.internal_count, data.id);

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