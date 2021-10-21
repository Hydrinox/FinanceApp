import { Component, OnInit } from '@angular/core';
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

  async ngOnInit() {
    let user = this.storage.getUserID();
    if (!user) { this.utils.logout(); }
    else {
      await this.budgetService.getExpenses(user).then(res => this.expenses = res);
      await this.budgetService.getIncome(user).then(res => this.income = res);
    }
    this.utils.hideSpinner();
  }

  displayExpenses(expensesOutput): void {
    this.expenses = expensesOutput;
  }

  displayIncome(incomeOutput): void {
    this.income = incomeOutput;
  }
}
