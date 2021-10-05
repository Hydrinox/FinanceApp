import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IncomeItem } from 'src/app/models/IncomeItem';
import { BudgetService } from 'src/app/services/budget.service';

@Component({
  selector: 'app-income-form',
  templateUrl: './income-form.component.html',
  styleUrls: ['./income-form.component.css']
})
export class IncomeFormComponent implements OnInit {
  incomeForm = new IncomeItem();
  payFrequency: string;
  incomeValue: number;
  @Output() incomeChanges = new EventEmitter<any>();


  constructor(private budgetService: BudgetService, private _snackBar: MatSnackBar) { }

  async ngOnInit() {
    this.budgetService.incomeRequest('get', '', null, '').then(res => this.incomeForm = res);
  }

  async saveIncome() {
    await this.budgetService.incomeRequest('post', '', this.incomeForm)
    this.incomeForm = await this.budgetService.incomeRequest('get', '', null, '');
    this.incomeChanges.emit(this.incomeForm);
  }
}
