import { TShirtSize } from "src/app/enum/tshirt-size.enum";

interface IProdutSize {
    size: TShirtSize;
    amount: number;
}

export class ProdutSize implements IProdutSize {
    size: TShirtSize;
    amount: number;

    constructor(size: TShirtSize, amount: number){
        this.size = size;
        this.amount = amount;
    }
}