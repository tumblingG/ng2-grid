import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlTdComponent } from './sl-td.component';

describe('SlTdComponent', () => {
  let component: SlTdComponent;
  let fixture: ComponentFixture<SlTdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlTdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlTdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
