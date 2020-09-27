import {Job} from "./Job";

export class User {

    // Internal
    private readonly _internal_id: number;

    private readonly _db_id: number;

    // Utils
    private _steam: string = '';
    private _discord: string = '';

    // RP
    private _money: number = 0;
    private _bank: number = 0;
    private _blackMoney: number = 0;

    // Work
    // ToDo: Can be done better... In a near future
    private _job: Job = null;
    private _employer: number = 0;
    private _working: boolean = false;

    // Administrative
    private _rank: number = 0;

    /**
     * Creates an instance of User
     *
     * @param internal_id The internal (shown) id for changes inside program
     * @param db_id The Database id of the user
     */
    constructor(internal_id: number, db_id: number) {
        this._internal_id = internal_id;
        this._db_id = db_id;
    }

    //

    public toggleWork(): boolean {
        this.working = !this.working;
        return this.working;
    }

    public pay(): number {
        this.bank = this.bank + this.job.rank(this.employer).salary;
        return this.job.rank(this.employer).salary;
    }

    //

    get db_id(): number {
        return this._db_id;
    }

    get internal_id(): number {
        return this._internal_id;
    }

    get steam(): string {
        return this._steam;
    }

    set steam(value: string) {
        this._steam = value;
    }

    get discord(): string {
        return this._discord;
    }

    set discord(value: string) {
        this._discord = value;
    }

    get money(): number {
        return this._money;
    }

    set money(value: number) {
        this._money = value;
    }

    get bank(): number {
        return this._bank;
    }

    set bank(value: number) {
        this._bank = value;
    }

    get blackMoney(): number {
        return this._blackMoney;
    }

    set blackMoney(value: number) {
        this._blackMoney = value;
    }

    get job(): Job {
        return this._job;
    }

    set job(value: Job) {
        this._job = value;
    }

    get employer(): number {
        return this._employer;
    }

    set employer(value: number) {
        this._employer = value;
    }

    get rank(): number {
        return this._rank;
    }

    set rank(value: number) {
        this._rank = value;
    }

    get working(): boolean {
        return this._working;
    }

    set working(value: boolean) {
        this._working = value;
    }
}