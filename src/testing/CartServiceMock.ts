import { Injectable } from '@angular/core';
import { Product, OrderLine } from '../app/model/interface';

import { FAKE_PRODUCT1, FAKE_PRODUCT2, PRODUCT_NOT_IN_CART } from './mock/mocks';
export { PRODUCT_NOT_IN_CART } from './mock/mocks';
export { CartService } from '../app/services';

export const MOCK_ITEMS = [{ product: FAKE_PRODUCT1, quantity: 1, price: FAKE_PRODUCT1.price }, { product: FAKE_PRODUCT2, quantity: 2, price: FAKE_PRODUCT2.price }];

@Injectable()
export class CartServiceMock {
  private items: OrderLine[] = [];

  constructor() {
    this.items = MOCK_ITEMS;
  }

  add(product: Product): void {
    if (this.contains(product)) {
      this.items.map(item => {
        if (item.product._id === product._id) {
          item.quantity += 1;
        }
        return item;
      });
    }
    else {
      this.items.push({ product: product, quantity: 1, price: product.price });
    }
  }

  contains(product: Product): boolean {
    return this.items.filter(item => item.product._id === product._id).length > 0;
  }

  delete(product: Product): OrderLine[] {
    this.items = this.items.filter(item => item.product._id !== product._id);
    return this.items;
  }

  clear(): void {
    this.items = [];
  }

  getItems(): OrderLine[] {
    return this.items;
  }

  getTotalPrice(): number {
    return this.items.reduce((sum, item) => {
      return sum + (item.product.price * item.quantity);
    }, 0);
  }

  getItem(product: Product): OrderLine {
    return this.items.find(item => item.product._id === product._id);
  }

}
