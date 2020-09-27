export class Log {

    private static NORMAL: LogType = {prefix: '[NORMAL] ', color: ''};
    private static DEBUG: LogType = {prefix: '[DEBUG] ', color: ''};
    private static WARNING: LogType = {prefix: '[WARNING] ', color: ''};
    private static DANGER: LogType = {prefix: '[DANGER] ', color: ''};
    private static INFO: LogType = {prefix: '[INFO] ', color: ''};

    public static normal(msg: string): void {
        this.log(Log.NORMAL, msg);
    }

    public static debug(msg: string): void {
        this.log(Log.DEBUG, msg);
    }

    public static warning(msg: string): void {
        this.log(Log.WARNING, msg);
    }

    public static danger(msg: string): void {
        this.log(Log.DANGER, msg);
    }

    public static info(msg: string): void {
        this.log(Log.INFO, msg);
    }

    private static log(logType: LogType, msg: string): void {
        console.log('BESX >> ' + logType.color + logType.prefix + msg);
    }
}

interface LogType {
    prefix: string;
    color: string;
}