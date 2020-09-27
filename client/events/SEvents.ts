export class SEvents {

    public heartBeat(): void {
        emitNet('besx:heartBeat', 'HeartBeat');
    }

    public getUserId(): void {
        emitNet('besx:getUserId');
    }

    public requestUserInfo(): void {

    }
}