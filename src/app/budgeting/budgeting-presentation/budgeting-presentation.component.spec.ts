import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetingPresentationComponent } from './budgeting-presentation.component';

describe('BudgetingPresentationComponent', () => {
  let component: BudgetingPresentationComponent;
  let fixture: ComponentFixture<BudgetingPresentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudgetingPresentationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetingPresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
