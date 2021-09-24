import { Component, OnInit } from '@angular/core';
import { StorageKey } from 'src/app/enums/storage.enum';
import { ExpenseItem } from 'src/app/models/ExpenseItem';
import { IncomeItem } from 'src/app/models/IncomeItem';
import { BudgetService } from 'src/app/services/budget.service';
import { RetirementCalcService } from 'src/app/services/retirement-calc.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit {

  expenses: Array<ExpenseItem>;
  income: IncomeItem;
  retirement: Array<object>;

  constructor(private budgetService: BudgetService, private retirementService: RetirementCalcService, private storageService: StorageService) { }

  async ngOnInit() {
    const expenseStorage = this.storageService.getData(StorageKey.expenseData);
    const incomeStorage = this.storageService.getData(StorageKey.incomeData);
    const retirementStorage = this.storageService.getData(StorageKey.retirementTimeline);

    if (expenseStorage) {
      this.expenses = JSON.parse(expenseStorage);
    } else {
      let res = await this.budgetService.expenseRequest('get', '', null, '');
      this.expenses = res;
      this.storageService.setData(StorageKey.expenseData, res)
    }

    if (incomeStorage) {
      this.income = JSON.parse(incomeStorage);
    } else {
      let res = await this.budgetService.incomeRequest('get', '', null, '');
      this.income = res;
      this.storageService.setData(StorageKey.incomeData, res)
    }

    if (retirementStorage) {
      this.retirement = JSON.parse(retirementStorage);
    } else {
      let timeline = await this.retirementService.retirementRequest('get', '', null, '');
      let res = this.retirementService.calculateRetirementTimeline(timeline);
      this.retirement = res;
      this.storageService.setData(StorageKey.retirementTimeline, res)
    }
  }
}
