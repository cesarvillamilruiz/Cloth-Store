import { Customization } from "./customization.model";
import { Location } from "../../enum/location.enum";

interface IDesign {
    designId: string;
    productId: string[];
    name: string;
    customizations: Customization[];
    location: Location.front | Location.back;
    colorName?: string;
}

export class Design implements IDesign {
    designId: string;
    productId: string[];
    name: string;
    customizations: Customization[];
    location: Location.front | Location.back;
    colorName?: string;

    constructor() {
       this.productId = [];
       this.customizations = [];
    }
}