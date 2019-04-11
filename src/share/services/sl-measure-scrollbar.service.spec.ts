import { TestBed } from '@angular/core/testing';

import { SlMeasureScrollbarService } from './sl-measure-scrollbar.service';

describe('SlMeasureScrollbarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SlMeasureScrollbarService = TestBed.get(SlMeasureScrollbarService);
    expect(service).toBeTruthy();
  });
});
