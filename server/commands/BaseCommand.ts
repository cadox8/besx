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

import {User} from "../../commons/api/user/User";
import {GameData} from "../api/GameData";

export abstract class BaseCommand {

    private readonly _command: string;
    private readonly _rank: number;
    private readonly _type: CommandType;

    protected constructor(command: string, rank: number = 0, type: CommandType = CommandType.CLIENT) {
        this._command = command;
        this._rank = rank;
        this._type = type;
    }

    public abstract register(): void;

    get command(): string {
        return this._command;
    }

    get rank(): number {
        return this._rank;
    }

    get type(): CommandType {
        return this._type;
    }

    protected getUser(source: number): User {
        return GameData.findUser(source);
    }
}

export enum CommandType {
    CLIENT, SERVER, BOTH, RCON
}