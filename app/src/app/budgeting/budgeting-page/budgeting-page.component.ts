import { Component, OnChanges, OnInit } from '@angular/core';
import { ExpenseItem } from 'src/app/models/ExpenseItem';
import { BudgetService } from 'src/app/services/budget.service';
import { transitionAnimation } from "../../animations";


@Component({
  selector: 'app-budgeting-page',
  templateUrl: './budgeting-page.component.html',
  styleUrls: ['./budgeting-page.component.css'],
  animations: [transitionAnimation]
})
export class BudgetingPageComponent implements OnInit {
  expenses: any;

  constructor(private budgetService: BudgetService) { }

  ngOnInit(): void {
    this.budgetService.expenseRequest('get', '', null, '').then(res => this.expenses = res);
  }

  displayExpenses(expensesOutput): void {
    this.expenses = expensesOutput;
  }
}
