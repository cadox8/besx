/*
 * Copyright (c) 2020 - cadox8
 *
 * All Rights Reserved
 *
 * That means:
 *
 * - You shall not use any piece of this software in a commercial product / service
 * - You shall not resell this software
 * - You shall not provide any facility to install this particular software in a commercial product / service
 * - If you redistribute this software, you must link to ORIGINAL repository at https://github.com/cadox8/besx
 * - This copyright should appear in every part of the project code
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

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