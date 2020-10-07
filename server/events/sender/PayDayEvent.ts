import {BaseEvent} from "./BaseEvent";
import {User} from "../../../commons/api/User";
import {GameData} from "../../api/GameData";

export class PayDayEvent extends BaseEvent {

    private readonly user: User;

    constructor(user: User) {
        super(user.internal_id);
        this.user = user;
    }

    protected event() {
        const user: User = GameData.findUser(this.user.internal_id);
        const amount: number = user.pay();
        GameData.updateUser(user);
        TriggerClientEvent('besx:payday', this.target, amount, user);
    }
}