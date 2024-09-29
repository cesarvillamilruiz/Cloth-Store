import { ColorName } from "src/app/enum/color.enum";
import { Position } from "src/app/enum/position.enum";
import { ProdutSize } from "./product-size.model";

interface IProduct {
    color: ColorName;
    position: Position;
    produtSize: ProdutSize[];
}

export class Product implements IProduct {
    color: ColorName;
    position: Position;
    produtSize: ProdutSize[];

    constructor(color: ColorName, position: Position){
        this.color = color;
        this.position = position;
        this.produtSize = [];
    }
}