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

import {InventoryMenu} from "../menus/InventoryMenu";
import {Menu} from "fivem-js";
import {AnimationsMenu} from "../menus/AnimationsMenu";
import {Client} from "../Client";

export class Input {

    private invOpened: boolean = false;

    private inventoryMenu: InventoryMenu;
    private animationsMenu: AnimationsMenu;

    constructor() {
        setInterval(() => this.checkKeys(), 500);

        this.inventoryMenu = new InventoryMenu();
        this.animationsMenu = new AnimationsMenu();
    }

    private checkKeys(): void {
        // Inventory
        if (IsControlPressed(0, Client.config.keys.inventory)) {
            this.closeAllInventories();
            this.invOpened = true;
            this.inventoryMenu.open();
        }

        // Animations
        if (IsControlPressed(0, Client.config.keys.animations)) {
            this.closeAllInventories();
            this.invOpened = true;
            this.animationsMenu.open();
        }
    }

    private closeAllInventories(): void {
        if (!this.invOpened) return;

        if (this.inventoryMenu.savedMenu !== null) this.inventoryMenu.savedMenu.close();
        if (this.animationsMenu.savedMenu !== null) this.animationsMenu.savedMenu.close();

        this.invOpened = false;
    }
}