import { TestBed, inject } from '@angular/core/testing';

import { StorageServiceMock, StorageService } from '../../testing/StorageServiceMock';
import { CartService } from './cart.service';
import { Product } from '../model/interface';

describe('CartService', () => {
  const fakeProductData: Product = {
    _id: '1',
    category: null,
    category_id: '1',
    name: 'name',
    description: 'desc',
    image: 'img',
    price: 100,
  };

  const fakeProductData2: Product = {
    _id: '2',
    category: null,
    category_id: '3',
    name: 'name',
    description: 'desc',
    image: 'img',
    price: 200,
  };

  const fakeProduct: Product = fakeProductData;
  const fakeProduct2: Product = fakeProductData2;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CartService,
        { provide: StorageService, useClass: StorageServiceMock },
      ]
    });
  });

  it('should be created', inject([CartService], (service: CartService) => {
    expect(service).toBeTruthy();
  }));

  it ('should add product to the cart', inject([CartService], (service: CartService) => {
    service.add(fakeProduct);
    expect(service.getItems().length).toEqual(1);
  }));

  it ('should remove item from cart', inject([CartService], (service: CartService) => {
    service.add(fakeProduct);

    service.delete(fakeProduct);
    expect(service.getItems().filter(item => item.product == fakeProduct).length).toEqual(0);
  }));

  it ('should clear the cart', inject([CartService], (service: CartService) => {
    service.add(fakeProduct);

    service.clear();

    expect(service.getItems().length).toEqual(0);
  }));

  it ('calculate the total price', inject([CartService], (service: CartService) => {
    service.add(fakeProduct);
    service.add(fakeProduct2);

    expect(service.getTotalPrice()).toEqual(300);
  }));

  it ('should update the quantity when adding same product', inject([CartService], (service: CartService) => {
    service.add(fakeProduct);
    service.add(fakeProduct);

    expect(service.getItem(fakeProduct).quantity).toEqual(2);
  }));

});
