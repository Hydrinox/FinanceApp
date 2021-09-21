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

  ngOnInit(): void {
    this.budgetService.incomeRequest('get', '', null, '')
      .subscribe((incomes: IncomeItem) => {
        this.incomeForm = incomes;
        this.incomeValue = incomes[0] ? incomes[0].value : null;
        this.payFrequency = incomes[0] ? incomes[0].frequency : null;
      },
        (error: ErrorEvent) => {
          console.log(error, "Error with getting income items")
        })
  }

  saveIncome() {
    let incomeItem: IncomeItem = {
      value: this.incomeValue,
      frequency: this.payFrequency,
    }
    this.budgetService.incomeRequest('post', '', incomeItem)
      .pipe(
        mergeMap(() => this.budgetService.incomeRequest('get', '', null, ''))
      )
      .subscribe((income: IncomeItem) => {
        this.incomeForm = income;
        this.openSnackBar('Income Saved!', 'Dismiss');
      }
      )
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

}
