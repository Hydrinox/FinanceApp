import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
  @Output() incomeChanges = new EventEmitter<any>();


  constructor(private budgetService: BudgetService) { }

  async ngOnInit() {
    this.incomeForm = {
      frequency: 'yearly',
      value: 50000,
      user: ''
    }
    await this.budgetService.incomeRequest('get', '', null, '').then(res => this.incomeForm = res);
  }

  async saveIncome() {
    await this.budgetService.incomeRequest('put', '', this.incomeForm)
    this.incomeForm = await this.budgetService.incomeRequest('get', '', null, '');
    this.incomeChanges.emit(this.incomeForm);
  }
}
