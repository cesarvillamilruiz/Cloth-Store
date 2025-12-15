import { Customization } from "./customization.model";
import { InventorySet } from "./InventorySet.model";

interface IItem {
    cartItemId: string;
    productId: string;
    name: string;
    inventorySet: InventorySet[];
    customization: Customization[];
}

export class Item implements IItem {
    cartItemId: string;
    productId: string;
    name: string;
    inventorySet: InventorySet[];
    customization: Customization[];
}