import { TestBed } from '@angular/core/testing';

import { SaleConditionsService } from './sale-conditions.service';

describe('SaleConditionsService', () => {
  let service: SaleConditionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaleConditionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
