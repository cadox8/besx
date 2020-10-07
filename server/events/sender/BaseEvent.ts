export abstract class BaseEvent {

    protected readonly target: number;

    protected constructor(target: number) {
        this.target = target;

        this.event();
    }

    protected abstract event();
}