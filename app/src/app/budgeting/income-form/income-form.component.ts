import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { mergeMap } from 'rxjs/operators';
import { IncomeItem } from 'src/app/models/IncomeItem';
import { BudgetService } from 'src/app/services/budget.service';

@Component({
  selector: 'app-income-form',
  templateUrl: './income-form.component.html',
  styleUrls: ['./income-form.component.css']
})
export class IncomeFormComponent implements OnInit {
  incomeForm: IncomeItem;
  payFrequency: string;
  incomeValue: number;

  constructor(private budgetService: BudgetService, private _snackBar: MatSnackBar) { }

  async ngOnInit() {
    const incomeRes = await this.budgetService.incomeRequest('get', '', null, '');
    this.incomeForm = incomeRes[0];

    this.incomeValue = incomeRes[0] ? incomeRes[0].value : null;
    this.payFrequency = incomeRes[0] ? incomeRes[0].frequency : null;
  }

  async saveIncome() {
    let incomeItem: IncomeItem = {
      value: this.incomeValue,
      frequency: this.payFrequency,
    }
    await this.budgetService.incomeRequest('post', '', incomeItem)
    this.incomeForm = await this.budgetService.incomeRequest('get', '', null, '');

    this.openSnackBar('Income Saved!', 'Dismiss');
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

}
