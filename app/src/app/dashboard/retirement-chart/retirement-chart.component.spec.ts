import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetirementChartComponent } from './retirement-chart.component';

describe('RetirementChartComponent', () => {
  let component: RetirementChartComponent;
  let fixture: ComponentFixture<RetirementChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetirementChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RetirementChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
