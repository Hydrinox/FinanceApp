import { Component, OnInit } from '@angular/core';
import { ExpenseItem } from 'src/app/models/ExpenseItem';
import { IncomeItem } from 'src/app/models/IncomeItem';
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

  async ngOnInit() {
    this.expenses = await this.budgetService.expenseRequest('get', '', null, '');

    this.income = await this.budgetService.incomeRequest('get', '', null, '');

    const timeLine = await this.retirementService.retirementRequest('get', '', null, '');
    this.retirement = this.retirementService.calculateRetirementTimeline(timeLine[0]);
  }
}
