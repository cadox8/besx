import {Client} from "../Client";
import {User} from "../../commons/api/User";

export class REvents {

    constructor() {
        this.events();
    }

    private events(): void {
        onNet('besx:createUser', (user: User) => Client.instance.user = user);

        onNet('besx:payday', (amount: number) => SetNotificationMessage('maze', 'maze', true, 9, 'Maze Bank', 'You received ' + amount + '$ from your work'));
    }
}