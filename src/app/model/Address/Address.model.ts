import { AddressType } from "src/app/enum/address-type.enum";

interface IAddress {
  addressId: string;

  name: string;
  type: AddressType;
  roadType: string;
  lineOne: string;
  particleOne?: string;
  lineTwo?: string;
  particleTwo?: string;
  lineThree?: string;
  particleThree?: string;
  complement?: string;

  city: string;
  department: string;
  country: string;

  phone: string;
}

export class Address implements IAddress {
  addressId: string;

  name: string;
  type: AddressType;
  roadType: string;
  lineOne: string;
  particleOne?: string;
  lineTwo?: string;
  particleTwo?: string;
  lineThree?: string;
  particleThree?: string;
  complement?: string;

  city: string;
  department: string;
  country: string;

  phone: string;
}