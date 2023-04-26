import { TestBed } from '@angular/core/testing';

import { OrderCategoryService } from './order-category.service';

describe('OrderCategoryService', () => {
  let service: OrderCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
