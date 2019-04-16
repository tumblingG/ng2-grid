import { TestBed } from '@angular/core/testing';

import { TableOptionsService } from './table-options.service';

describe('TableOptionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TableOptionsService = TestBed.get(TableOptionsService);
    expect(service).toBeTruthy();
  });
});
