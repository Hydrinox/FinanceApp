import { Component, OnInit } from '@angular/core';
import { IncomeItem } from 'src/app/models/IncomeItem';
import { Retirement } from 'src/app/models/Retirement';
import { AuthService } from 'src/app/services/auth.service';
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
  retirement: string;
  retirementForm: Retirement;
  totalContributions: number;

  constructor(private budgetService: BudgetService, private retirementService: RetirementCalcService, private storage: StorageService, private utils: UtilsService) { }


  async ngOnInit() {
    let user = this.storage.getUserID();
    if (!user) { this.utils.logout(); }
    else {
      await this.budgetService.getExpenses(user).then(res => this.expenses = res);
      await this.budgetService.getIncome(user).then(res => this.income = res);
      await this.retirementService.getRetirement(user).then(res => {
        console.log("step 1");
        this.retirement = this.retirementService.calculateRetirementTotal(res);
        console.log("step 2");
        this.retirementForm = res;
        console.log("step 3");
        this.totalContributions = res.startPrincipal + (res.retirementAge - res.currentAge) * 12 * res.contributions;
        console.log("step 4");
      });
    }
  }
}
