import {User} from "../../commons/api/User";

export class SEvents {

    public createUser(user: User): void {
        emitNet('besx:createUser', user);
    }

    public payDay(amount: number): void {
        emitNet('besx:payday', amount);
    }
}