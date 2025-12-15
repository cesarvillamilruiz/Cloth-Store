import { CustomizationType } from "src/app/enum/type-option.enum";

interface ICustomization {
    id: number;
    customizationId: string;
    cartItemId: string;
    text: string;
    zIndex: number;
    isHorizontalInverted: boolean;
    isVerticalInverted: boolean;
    fontFamily: string;
    fontColorId: string;
    fontSize: number;
    outlineFontColorId: string;
    designId: string;
    imageUrl: string;
    width: number;
    height: number;
    topDistance: number;
    leftDistance: number;
    arch: number;
    imageType: string;
    type: CustomizationType;
    isFrontLocation: boolean;
}

export class Customization implements ICustomization {
    id: number;
    customizationId: string;
    cartItemId: string;
    text: string;
    zIndex: number;
    isHorizontalInverted: boolean;
    isVerticalInverted: boolean;
    fontFamily: string;
    fontColorId: string;
    fontSize: number;
    outlineFontColorId: string;
    designId: string;
    imageUrl: string;
    width: number;
    height: number;
    topDistance: number;
    leftDistance: number;
    arch: number;
    imageType: string;
    type: CustomizationType;
    isFrontLocation: boolean;
}