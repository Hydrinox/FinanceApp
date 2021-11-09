import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IncomeItem } from 'src/app/models/IncomeItem';
import { BudgetService } from 'src/app/services/budget.service';
import { StorageService } from 'src/app/services/storage.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-income-form',
  templateUrl: './income-form.component.html',
  styleUrls: ['./income-form.component.css']
})
export class IncomeFormComponent implements OnInit {
  incomeForm = new IncomeItem();
  payFrequency: string;
  userID: string;
  @Output() incomeChanges = new EventEmitter<any>();


  constructor(private budgetService: BudgetService, private storage: StorageService, private utils: UtilsService) { }

  async ngOnInit() {
    this.incomeForm = {
      frequency: 'yearly',
      value: 50000,
      _id: ''
    }
    this.userID = this.storage.getUserID();
    if (!this.userID) { this.utils.logout(); }
    else {
      await this.budgetService.getIncome(this.userID).then(res => this.incomeForm = res);
    }
  }

  async saveIncome() {
    try {
      await this.budgetService.updateIncome(this.incomeForm)
      this.incomeForm = await this.budgetService.getIncome(this.userID);
      this.incomeChanges.emit(this.incomeForm);
    }
    catch (err) {
      this.utils.logout();
    }
  }
}
