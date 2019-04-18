import { TestBed } from '@angular/core/testing';

import { HashKeyService } from './hash-key.service';

describe('HashKeyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HashKeyService = TestBed.get(HashKeyService);
    expect(service).toBeTruthy();
  });
});
