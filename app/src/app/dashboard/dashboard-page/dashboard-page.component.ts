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

  expenses: any;
  income: IncomeItem;
  retirement: Array<object>;

  constructor(private budgetService: BudgetService, private retirementService: RetirementCalcService) { }

  async ngOnInit() {
    this.budgetService.expenseRequest('get', '', null, '').then(res => this.expenses = res);
    this.budgetService.incomeRequest('get', '', null, '').then(res => this.income = res);
    this.retirementService.retirementRequest('get', '', null, '').then(res => this.retirement = this.retirementService.calculateRetirementTimeline(res));
  }
}
