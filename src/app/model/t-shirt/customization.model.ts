import { CustomizationType } from "src/app/enum/type-option.enum";
import { Location } from "src/app/enum/location.enum";

interface ICustomization {
    id: number;
    customizationId: string;
    designId: string;
    isHorizontalInverted: boolean;
    isVerticalInverted: boolean;
    location: Location.front | Location.back;
    zIndex: number;
    topDistance: number;
    leftDistance: number;
    type: CustomizationType;
    width: number;
    height: number;

    imageUrl: string;
    imageType: string;

    fontFamily: string;
    text: string;
    fontSize: number;
    fontColorId: string;
    outlineFontColorId: string;
    arch: number;
}

export class Customization implements ICustomization {
    id: number;
    customizationId: string;
    designId: string;
    isHorizontalInverted: boolean;
    isVerticalInverted: boolean;
    location: Location.front | Location.back;
    zIndex: number;
    topDistance: number;
    leftDistance: number;
    type: CustomizationType;
    width: number;
    height: number;
    
    imageUrl: string;
    imageType: string;

    fontFamily: string;
    text: string;
    fontSize: number;
    fontColorId: string;
    outlineFontColorId: string;
    arch: number;
}