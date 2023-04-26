import { TestBed } from '@angular/core/testing';

import { TypeMachineService } from './type-machine.service';

describe('TypeMachineService', () => {
  let service: TypeMachineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeMachineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
