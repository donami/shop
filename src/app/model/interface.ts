import { normalize, schema } from 'normalizr';
import { Product, Variant, ProductImage } from '../products/product';
import { Category } from '../category/category';
import { Order } from '../order/order';
import { Payment } from '../payment/payment';
import { Shipping } from '../carrier/carrier';
import { User } from '../auth/user'

export interface IOption {
  value: any;
  label: string;
  disabled?: boolean;
}

export interface Discount {
  value: number;
  startDate: string;
  endDate: string;
  active: boolean;
}

interface CartProduct {
  product: Product;
  quantity: number;
}

class Message {
  constructor(public type: string, public message: string, public title?: string) { }
}

interface ErrorResponse {
  status: number;
  message: string;
  data: any;
}

interface SuccessResponse {
  status: number;
  message: string;
  data: any;
}

export interface ResolveEmit {
    // Returns this if modal resolved with yes or no
    resolved?: boolean;
    // If the modal was closed in some other way this is removed
    closedWithOutResolving?: string;
}

class ContactMessage {
  constructor(public name: String, public email: String, public message: String) { }
}

export class DropdownValue {
  value: string;
  label: string;

  constructor(value:string, label:string) {
    this.value = value;
    this.label = label;
  }
}

class ICustomer {
  _id?: string;
  phone: string;
  country: string;
  email: string;
  postnumber: string;
  city: string;
  address: string;
  lastname: string;
  firstname: string;
  orders: Order[];
  active?: boolean;
  note?: string;
  createdAt: string;
}
class Customer implements ICustomer {
  _id?: string;
  phone: string;
  country: string;
  email: string;
  postnumber: string;
  city: string;
  address: string;
  lastname: string;
  firstname: string;
  orders: Order[];
  active?: boolean;
  note?: string;
  createdAt: string;

  constructor(customer: ICustomer) {
    this._id = customer._id;
    this.phone = customer.phone;
    this.country = customer.country;
    this.email = customer.email;
    this.postnumber = customer.postnumber;
    this.city = customer.city;
    this.address = customer.address;
    this.lastname = customer.lastname;
    this.firstname = customer.firstname;
    this.orders = customer.orders;
    this.active = customer.active ? customer.active : true;
    this.note = customer.note;
    this.createdAt = customer.createdAt;
  }

  public differs(other: Customer): boolean {
    if (this.phone !== other.phone ||
      this.country !== other.country ||
      this.email !== other.email ||
      this.postnumber !== other.postnumber ||
      this.city !== other.city ||
      this.address !== other.address ||
      this.lastname !== other.lastname ||
      this.firstname !== other.firstname
    ) {
      return true;
    }

    return false;
  }

  public getFullname(): string {
    return `${this.firstname} ${this.lastname}`;
  }

  public getStatus(): string {
    return this.active ? 'Enabled' : 'Disabled';
  }
}

class IOrderLine {
  quantity: number;
  price: number;
  variant: Variant;
}

class OrderLine implements IOrderLine {
  quantity: number;
  price: number;
  variant: Variant;

  constructor(orderLine: IOrderLine) {
    this.quantity = orderLine.quantity;
    this.price = orderLine.price;
    this.variant = orderLine.variant ? new Variant(orderLine.variant) : null;
  }

  public getTotalPrice(): number {
    return this.price * this.quantity;
  }
}

export enum ShippingStatus {
  Pending = 0,
  AwaitingShipment = 1,
  Shipped = 2,
  Completed = 4,
}

export class ShippingLine {
  constructor(
    public value: Shipping,
    public trackingNumber: string,
    public price: number,
    public weight: number,
  ) { }
}

export class IShippingAddress {
  email: string;
  phone: string;
  firstname: string;
  lastname: string;
  postnumber: string;
  address: string;
  country: string;
  city: string;
}

export class ShippingAddress {
  email: string;
  phone: string;
  firstname: string;
  lastname: string;
  postnumber: string;
  address: string;
  country: string;
  city: string;

  constructor(shippingAddress: IShippingAddress) {
    this.email = shippingAddress.email;
    this.phone = shippingAddress.phone;
    this.firstname = shippingAddress.firstname;
    this.lastname = shippingAddress.lastname;
    this.postnumber = shippingAddress.postnumber;
    this.address = shippingAddress.address;
    this.country = shippingAddress.country;
    this.city = shippingAddress.city;
  }

  public getFullname(): string {
    return `${this.firstname} ${this.lastname}`;
  }
}

export {
  Category,
  CartProduct,
  ProductImage,
  ContactMessage,
  Payment,
  Customer,
  Message,
  ErrorResponse,
  SuccessResponse,
  OrderLine,
  Order,
  User,
  Shipping,
  Product,
}
