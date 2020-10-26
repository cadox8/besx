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

import {Client} from "../Client";
import {Menu, Point, UIMenuItem} from "fivem-js";
import {Animations} from "../../commons/utils/Animations";

export class AnimationsMenu {

    private readonly point: Point;

    public savedMenu: Menu;

    constructor(point?: Point) {
        this.point = point;
    }

    public open(): void {
        const menu: Menu = new Menu('Inventory', '', this.point);
        const expressions: Menu = new Menu('Expressions', '', this.point);

        // Expressions
        const expressionsItem: UIMenuItem = new UIMenuItem('Expressions');
        menu.addItem(expressionsItem);
        menu.bindMenuToItem(expressions, expressionsItem);
        Animations.EXPRESSIONS.forEach(a => expressions.addItem(new UIMenuItem(a.name)));

        // Walks

        menu.open();
        this.savedMenu = menu;
    }
}