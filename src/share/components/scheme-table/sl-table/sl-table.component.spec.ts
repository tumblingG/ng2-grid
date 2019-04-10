import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlTableComponent } from './sl-table.component';

describe('SlTableComponent', () => {
  let component: SlTableComponent;
  let fixture: ComponentFixture<SlTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
