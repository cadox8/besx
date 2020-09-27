import {createPool, MysqlError, Pool} from "mysql";
import {Log} from "../../commons/utils/Log";

export class Database {

    private static _database: Pool;

    constructor({ host, port, user, password, database }) {
        Log.debug('Loading Database...');
        this.loadPool({ host, port, user, password, database });
        Log.debug('Database Loaded!');
    }

    private loadPool({ host, port, user, password, database }): void {
        Database._database = createPool({
            host: host,
            port: port,
            user: user,
            password: password,
            database: database,
            multipleStatements: true
        });

        Database._database.on('error', (err: MysqlError) => Log.danger('[Database] ' + err.sqlMessage));
    }

    static get database(): Pool {
        return this._database;
    }
}