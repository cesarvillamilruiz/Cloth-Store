import { Customization } from "./customization.model";
import { InventorySet } from "./Inventory-set.model";

interface ICartItem {
    cartItemId: string;
    productId: string;
    name: string;
    inventorySet: InventorySet[];
    customization: Customization[];
    isFrontLocation: boolean;
}

export class CartItem implements ICartItem {
    cartItemId: string;
    productId: string;
    name: string;
    inventorySet: InventorySet[];
    customization: Customization[];
    isFrontLocation: boolean;
}