import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ExpenseItem } from 'src/app/models/ExpenseItem';
import { IncomeItem } from 'src/app/models/IncomeItem';
import { BudgetService } from 'src/app/services/budget.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit {

expenses: Array<ExpenseItem>;
income: Array<IncomeItem>;

  constructor(private budgetService: BudgetService) { }

  ngOnInit(): void {
    this.budgetService.expenseRequest('get', '', null, '').subscribe((expenses: any[]) => {
    this.expenses = expenses;
    },
    (error: ErrorEvent) => {
      console.log(error, "Error with getting budget items")
    })

    this.budgetService.incomeRequest('get', '', null, '').subscribe((incomes: any[]) => {
      this.income = incomes;
      },
      (error: ErrorEvent) => {
        console.log(error, "Error with getting income items")
      })
  }
}
