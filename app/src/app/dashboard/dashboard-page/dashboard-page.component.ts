import { Component, OnInit } from '@angular/core';
import { IncomeItem } from 'src/app/models/IncomeItem';
import { Retirement } from 'src/app/models/Retirement';
import { AuthService } from 'src/app/services/auth.service';
import { BudgetService } from 'src/app/services/budget.service';
import { RetirementCalcService } from 'src/app/services/retirement-calc.service';
import { StorageService } from 'src/app/services/storage.service';
import { transitionAnimation } from "../../animations";

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css'],
  animations: [transitionAnimation]
})
export class DashboardPageComponent implements OnInit {

  expenses: any;
  income: IncomeItem;
  retirement: string;
  retirementForm: Retirement;
  totalContributions: number;

  constructor(private budgetService: BudgetService, private retirementService: RetirementCalcService, private storage: StorageService) { }


  async ngOnInit() {
    let user = this.storage.getUserID();
    await this.budgetService.expenseRequest('get', '', null, user).then(res => this.expenses = res);
    await this.budgetService.incomeRequest('get', '', null, user).then(res => this.income = res);
    await this.retirementService.retirementRequest('get', '', null, user).then(res => {
      this.retirement = this.retirementService.calculateRetirementTotal(res);
      this.retirementForm = res;
      this.totalContributions = res.startPrincipal + (res.retirementAge - res.currentAge) * 12 * res.contributions;
    });
  }
}
