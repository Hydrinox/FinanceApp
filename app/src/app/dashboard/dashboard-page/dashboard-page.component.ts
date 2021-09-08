import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BudgetItem } from 'src/app/models/BudgetItem';
import { BudgetService } from 'src/app/services/budget.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit {

expenses: Array<BudgetItem>;

  constructor(private budgetService: BudgetService) { }

  ngOnInit(): void {
    this.budgetService.budgetRequest('get', '', null, '').subscribe((expenses: any[]) => {
    expenses.forEach(expense => {
      expense.value = expense.amount 
    })
    this.expenses = expenses;
    },
    (error: ErrorEvent) => {
      console.log(error, "Error with getting budget items")
    })
  }

}
