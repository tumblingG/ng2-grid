import { TestBed } from '@angular/core/testing';

import { RowHashMapService } from './row-hash-map.service';

describe('RowHashMapService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RowHashMapService = TestBed.get(RowHashMapService);
    expect(service).toBeTruthy();
  });
});
