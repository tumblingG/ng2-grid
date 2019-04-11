import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlTheadComponent } from './sl-thead.component';

describe('SlTheadComponent', () => {
  let component: SlTheadComponent;
  let fixture: ComponentFixture<SlTheadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlTheadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlTheadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
