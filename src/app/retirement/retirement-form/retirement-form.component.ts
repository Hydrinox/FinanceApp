import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RetirementCalcService } from "../../services/retirement-calc.service";
import { RetirementForm } from "../../models/RetirementForm";

@Component({
  selector: 'app-retirement-form',
  templateUrl: './retirement-form.component.html',
  styleUrls: ['./retirement-form.component.scss']
})
export class RetirementFormComponent implements OnInit {
  formModel = new RetirementForm();
  retirementNumber: string;  
  @Output() textDisplayEvent = new EventEmitter<string>();
  @Output() retirementNumberEvent = new EventEmitter<string>();

  constructor(private retirementCalc: RetirementCalcService) { }

  ngOnInit(): void {
    this.formModel = this.retirementCalc.formFieldValues ? this.retirementCalc.formFieldValues : this.formModel;
    this.formModel.startPrincipal = this.retirementCalc.formFieldValues.startPrincipal ? this.retirementCalc.formFieldValues.startPrincipal : 0;
    this.formModel.growthRate = this.retirementCalc.formFieldValues.growthRate ? this.retirementCalc.formFieldValues.growthRate : 7;
    // this.formModel.currentAge = 25;
    // this.formModel.retirementAge = 65;
    //this.formModel.growthRate = 7;
    // this.formModel.startPrincipal = 175000;
    // this.formModel.contributions = 0;
  }

  OnSubmit(){
    this.retirementCalc.saveFormState(this.formModel);
    this.retirementNumber = this.retirementCalc.calculate(this.formModel);
    this.retirementNumberEvent.emit(this.retirementCalc.calculate(this.formModel));
  }

  emitTextValue(event){
    this.textDisplayEvent.emit(event.target.name);
  }

}
