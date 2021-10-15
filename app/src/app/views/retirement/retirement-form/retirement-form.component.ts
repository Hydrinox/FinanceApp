import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RetirementCalcService } from "../../../services/retirement-calc.service";
import { Retirement } from "../../../models/Retirement";
import { StorageService } from 'src/app/services/storage.service';
import { StorageKey } from 'src/app/enums/storage.enum';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-retirement-form',
  templateUrl: './retirement-form.component.html',
  styleUrls: ['./retirement-form.component.scss']
})
export class RetirementFormComponent implements OnInit {
  formModel = new Retirement();
  retirementNumber: string;
  userID: string;
  @Output() timelineChangeEvent = new EventEmitter<any[]>();
  @Output() retirementNumberEvent = new EventEmitter<string>();

  constructor(private retirementCalc: RetirementCalcService, private storage: StorageService, private utils: UtilsService) { }

  async ngOnInit() {
    this.userID = this.storage.getUserID();
    if (!this.userID) { this.utils.logout(); }
    else {
      this.formModel = await this.retirementCalc.getRetirement(this.userID);
      if (!this.formModel) {
        this.formModel = {
          currentAge: 18,
          retirementAge: 65,
          startPrincipal: 10000,
          contributions: 100,
          growthRate: 7,
          _id: ''
        }
      }
      this.retirementNumberEvent.emit(this.retirementCalc.calculateRetirementTotal(this.formModel));
      this.timelineChangeEvent.emit(this.retirementCalc.calculateRetirementTimeline(this.formModel));
    }
  }

  async OnSubmit() {
    await this.retirementCalc.updateRetirement(this.formModel);
    this.retirementNumber = this.retirementCalc.calculateRetirementTotal(this.formModel);
    this.retirementNumberEvent.emit(this.retirementCalc.calculateRetirementTotal(this.formModel));
    this.timelineChangeEvent.emit(this.retirementCalc.calculateRetirementTimeline(this.formModel));
  }
}
