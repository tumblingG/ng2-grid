import { TestBed } from '@angular/core/testing';

import { TableUtilService } from './table-util.service';

describe('TableUtilService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TableUtilService = TestBed.get(TableUtilService);
    expect(service).toBeTruthy();
  });
});
