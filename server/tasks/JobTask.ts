import {GameData} from "../api/GameData";
import {Server} from "../Server";

export class JobTask {

    private readonly delay: number; // Seconds

    constructor(delay: number = 60) {
        this.delay = delay;
    }

    public run(): void {
        setInterval(async () => {
            GameData.prototype.users.forEach(u => Server.instance.sEvents.payDay(u.pay()));
        }, this.delay * 1000);
    }
}