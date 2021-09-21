import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ExpenseItem } from 'src/app/models/ExpenseItem';
import { IncomeItem } from 'src/app/models/IncomeItem';
import { Retirement } from 'src/app/models/Retirement';
import { BudgetService } from 'src/app/services/budget.service';
import { RetirementCalcService } from 'src/app/services/retirement-calc.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit {

  expenses: Array<ExpenseItem>;
  income: IncomeItem;
  retirement: Array<object>;

  constructor(private budgetService: BudgetService, private retirementService: RetirementCalcService) { }

  ngOnInit(): void {
    this.budgetService.expenseRequest('get', '', null, '').subscribe((expenses: any[]) => {
      this.expenses = expenses;
    },
      (error: ErrorEvent) => {
        console.log(error, "Error with getting budget items")
      });

    this.budgetService.incomeRequest('get', '', null, '').subscribe((income: IncomeItem) => {
      this.income = income;
    },
      (error: ErrorEvent) => {
        console.log(error, "Error with getting income items")
      });

    this.retirementService.retirementRequest('get', '', null, '').subscribe((retirementValues => {
      this.retirement = this.retirementService.calculateRetirementTimeline(retirementValues[0]);
    }));
  }
}
