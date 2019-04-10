import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlThComponent } from './sl-th.component';

describe('SlThComponent', () => {
  let component: SlThComponent;
  let fixture: ComponentFixture<SlThComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlThComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlThComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
