import { Component, OnChanges, OnInit } from '@angular/core';
import { ExpenseItem } from 'src/app/models/ExpenseItem';
import { IncomeItem } from 'src/app/models/IncomeItem';
import { BudgetService } from 'src/app/services/budget.service';
import { StorageService } from 'src/app/services/storage.service';
import { UtilsService } from 'src/app/services/utils.service';
import { transitionAnimation } from "../../../animations";


@Component({
  selector: 'app-budgeting-page',
  templateUrl: './budgeting-page.component.html',
  styleUrls: ['./budgeting-page.component.css'],
  animations: [transitionAnimation]
})
export class BudgetingPageComponent implements OnInit {
  expenses: any;
  income: IncomeItem;

  constructor(private budgetService: BudgetService, private storage: StorageService, private utils: UtilsService) { }

  ngOnInit(): void {
    let user = this.storage.getUserID();
    if (!user) { this.utils.logout(); }
    else {
      this.budgetService.getExpenses(user).then(res => this.expenses = res);
      this.budgetService.getIncome(user).then(res => this.income = res);
    }
  }

  displayExpenses(expensesOutput): void {
    this.expenses = expensesOutput;
  }

  displayIncome(incomeOutput): void {
    this.income = incomeOutput;
  }
}
