export class Job {

    private readonly _id: number;
    private readonly _name: string;

    private readonly _ranks: Employer[];

    constructor(id: number, name: string) {
        this._id = id;
        this._name = name || 'Undefined';
        this._ranks = [];
    }

    public addRank(rank: Employer): void {
        this._ranks.push(rank);
    }

    public rank(id: number): Employer {
        return this.ranks.find(r => r.id === id);
    }

    public getBoss(): Employer {
        return this._ranks.find(r => r.boss);
    }

    get id(): number {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get ranks(): Employer[] {
        return this._ranks;
    }
}

export class Employer {

    private readonly _id: number;
    private readonly _name: string;
    private _salary: number;

    private _boss: boolean;

    constructor(id: number, name: string) {
        this._id = id;
        this._name = name;

        this._salary = 0;
        this._boss = false;
    }

    get id(): number {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get salary(): number {
        return this._salary;
    }

    set salary(value: number) {
        this._salary = value;
    }

    get boss(): boolean {
        return this._boss;
    }

    set boss(value: boolean) {
        this._boss = value;
    }
}