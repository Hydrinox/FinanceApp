import { Component, OnInit } from '@angular/core';
import { IncomeItem } from 'src/app/models/IncomeItem';
import { Retirement } from 'src/app/models/Retirement';
import { BudgetService } from 'src/app/services/budget.service';
import { RetirementCalcService } from 'src/app/services/retirement-calc.service';
import { StorageService } from 'src/app/services/storage.service';
import { UtilsService } from 'src/app/services/utils.service';
import { transitionAnimation } from "../../../animations";

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css'],
  animations: [transitionAnimation]
})
export class DashboardPageComponent implements OnInit {

  expenses: any;
  income: IncomeItem;
  retirement: number;
  retirementForm: Retirement;
  totalContributions: number;

  constructor(private budgetService: BudgetService, private retirementService: RetirementCalcService, private storage: StorageService, private utils: UtilsService) { }


  async ngOnInit() {
    try {
      let user = this.storage.getUserID();
      if (!user) this.utils.logout();
      else {
        await this.budgetService.getExpenses(user).then(res => this.expenses = res);
        await this.budgetService.getIncome(user).then(res => this.income = res);
        await this.retirementService.getRetirement(user).then(res => {
          this.retirement = this.retirementService.calculateRetirementTotal(res);
          this.retirementForm = res;
          this.totalContributions = res.startPrincipal + (res.retirementAge - res.currentAge) * 12 * res.contributions;
        });
      }
      this.utils.hideSpinner();
    }
    catch (e) {
      console.log(e);
      this.utils.logout();
      this.utils.hideSpinner();
    }
  }
}
