import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZcPaginationComponent } from './zc-pagination.component';

describe('ZcPaginationComponent', () => {
  let component: ZcPaginationComponent;
  let fixture: ComponentFixture<ZcPaginationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZcPaginationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZcPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
