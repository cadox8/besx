import {User} from "../../commons/api/user/User";
import {Client} from "../Client";
import {Menu, Point, UIMenuItem} from "fivem-js";

export class InventoryMenu {

    private readonly user: User;

    private readonly point: Point;

    constructor(point?: Point) {
        this.point = point;
        this.user = Client.instance.user;
    }

    public open(): Menu {
        const menu: Menu = new Menu('Inventory', '', this.point);

        // Load Items
        this.user.inventory.items.forEach(i => {
            const item: UIMenuItem = new UIMenuItem(i.item.displayName + ' x' + i.amount);
            const usableMenu: Menu = new Menu(i.item.displayName, '', this.point);
            const back: UIMenuItem = new UIMenuItem('Back');

            usableMenu.bindMenuToItem(menu, back);

            if (i.item.usable) usableMenu.addItem(new UIMenuItem('Use'));

            usableMenu.addItem(new UIMenuItem('Give'));
            usableMenu.addItem(new UIMenuItem('Throw'));
            usableMenu.addItem(new UIMenuItem('Back'));

            menu.addItem(item);
        });

        menu.open();
        return menu;
    }
}