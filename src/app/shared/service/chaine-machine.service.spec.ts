import { TestBed } from '@angular/core/testing';

import { ChaineMachineService } from './chaine-machine.service';

describe('ChaineMachineService', () => {
  let service: ChaineMachineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChaineMachineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
