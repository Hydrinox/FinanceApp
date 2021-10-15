import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RetirementCalcService } from "../../../services/retirement-calc.service";
import { Retirement } from "../../../models/Retirement";
import { StorageService } from 'src/app/services/storage.service';
import { StorageKey } from 'src/app/enums/storage.enum';

@Component({
  selector: 'app-retirement-form',
  templateUrl: './retirement-form.component.html',
  styleUrls: ['./retirement-form.component.scss']
})
export class RetirementFormComponent implements OnInit {
  formModel = new Retirement();
  retirementNumber: string;
  @Output() timelineChangeEvent = new EventEmitter<any[]>();
  @Output() retirementNumberEvent = new EventEmitter<string>();

  constructor(private retirementCalc: RetirementCalcService, private storageService: StorageService) { }

  async ngOnInit() {
    this.formModel = await this.retirementCalc.retirementRequest('get', '', null, '');
    if (!this.formModel) {
      this.formModel = {
        currentAge: 18,
        retirementAge: 65,
        startPrincipal: 10000,
        contributions: 100,
        growthRate: 7,
        user: ''
      }
    }
    this.retirementNumberEvent.emit(this.retirementCalc.calculateRetirementTotal(this.formModel));
    this.timelineChangeEvent.emit(this.retirementCalc.calculateRetirementTimeline(this.formModel));
  }

  async OnSubmit() {
    await this.retirementCalc.retirementRequest('put', '', this.formModel);
    this.retirementNumber = this.retirementCalc.calculateRetirementTotal(this.formModel);
    this.retirementNumberEvent.emit(this.retirementCalc.calculateRetirementTotal(this.formModel));
    this.timelineChangeEvent.emit(this.retirementCalc.calculateRetirementTimeline(this.formModel));
  }
}