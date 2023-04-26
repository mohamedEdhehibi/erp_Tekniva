import { TestBed } from '@angular/core/testing';

import { EmployésService } from './employee.service';

describe('EmployésService', () => {
  let service: EmployésService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployésService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
