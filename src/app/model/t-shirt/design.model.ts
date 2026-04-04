import { Customization } from "./customization.model";
import { Location } from "../../enum/location.enum";

interface IDesign {
    designId: string;
    productId: string[];
    name: string;
    // inventorySet: InventorySet[];
    customization: Customization[];
    location: Location.front | Location.back;
}

export class Design implements IDesign {
    designId: string;
    productId: string[];
    name: string;
    // inventorySet: InventorySet[];
    customization: Customization[];
    location: Location.front | Location.back;

    constructor() {
       this.productId = [];
       this.customization = [];
    }
}