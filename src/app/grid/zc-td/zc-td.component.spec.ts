import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZcTdComponent } from './zc-td.component';

describe('ZcTdComponent', () => {
  let component: ZcTdComponent;
  let fixture: ComponentFixture<ZcTdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZcTdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZcTdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
