import {PlayerConnectingEvent} from "./reciever/PlayerConnectingEvent";

export class EventHandler {

    public handle(): void {
        onNet('playerConnecting', (name: string, setKickReason: any, deferrals: any) => new PlayerConnectingEvent(name, setKickReason, deferrals));
    }
}