interface IOptionProduct {
    optionProductId: string;
    colorId: string;
    name: string;
    description: string;
    basePrice: number;
}

export class OptionProduct implements IOptionProduct {
    optionProductId: string;
    colorId: string;
    name: string;
    description: string;
    basePrice: number;
}