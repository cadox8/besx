import {Job} from "../../commons/api/Job";
import {User} from "../../commons/api/User";

export class GameData {

    private readonly _users: User[];
    private _jobs: Job[];

    constructor() {
        this._users = [];
        this._jobs = [];
    }

    get users(): User[] {
        return this._users;
    }

    get jobs(): Job[] {
        return this._jobs;
    }

    set jobs(value: Job[]) {
        this._jobs = value;
    }

    static getJob(id: number): Job {
        return this.prototype.jobs.find(j => j.id === id);
    }

    static addUser(user: User): void {
        this.prototype.users.push(user);
    }

    static findUser(internal_id: number): User {
        return this.prototype.users.find(u => u.internal_id === internal_id);
    }
}