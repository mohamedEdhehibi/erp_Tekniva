import { TestBed } from '@angular/core/testing';

import { PostCleService } from './post-cle.service';

describe('PostCleService', () => {
  let service: PostCleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostCleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
