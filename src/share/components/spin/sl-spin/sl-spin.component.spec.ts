import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlSpinComponent } from './sl-spin.component';

describe('SlSpinComponent', () => {
  let component: SlSpinComponent;
  let fixture: ComponentFixture<SlSpinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlSpinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlSpinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
