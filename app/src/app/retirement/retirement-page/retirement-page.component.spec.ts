import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetirementPageComponent } from './retirement-page.component';

describe('RetirementPageComponent', () => {
  let component: RetirementPageComponent;
  let fixture: ComponentFixture<RetirementPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetirementPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RetirementPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
