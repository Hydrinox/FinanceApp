import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetStackedChartComponent } from './budget-stacked-chart.component';

describe('BudgetStackedChartComponent', () => {
  let component: BudgetStackedChartComponent;
  let fixture: ComponentFixture<BudgetStackedChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudgetStackedChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetStackedChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
