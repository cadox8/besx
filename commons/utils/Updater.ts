import {Log} from "./Log";

export class Updater {

    public static VERSION: string = '0.2.0'

    private checkUpdate(): boolean {
        return true;
    }

    public update(): void {
        if (!this.checkUpdate()) return;
        Log.debug('---------------- BESX ----------------');
        Log.debug('Please, update to the latest version!');
        Log.debug('---------------- BESX ----------------');
    }
}