import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { mergeMap } from 'rxjs/operators';
import { StorageKey } from 'src/app/enums/storage.enum';
import { IncomeItem } from 'src/app/models/IncomeItem';
import { BudgetService } from 'src/app/services/budget.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-income-form',
  templateUrl: './income-form.component.html',
  styleUrls: ['./income-form.component.css']
})
export class IncomeFormComponent implements OnInit {
  incomeForm = new IncomeItem();
  payFrequency: string;
  incomeValue: number;

  constructor(private budgetService: BudgetService, private storageService: StorageService, private _snackBar: MatSnackBar) { }

  async ngOnInit() {
    this.budgetService.incomeRequest('get', '', null, '').then(res => this.incomeForm = res);
  }

  async saveIncome() {
    let incomeItem: IncomeItem = {
      value: this.incomeValue,
      frequency: this.payFrequency,
    }
    await this.budgetService.incomeRequest('post', '', this.incomeForm)
    this.openSnackBar('Income Saved!', 'Dismiss');
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

}
