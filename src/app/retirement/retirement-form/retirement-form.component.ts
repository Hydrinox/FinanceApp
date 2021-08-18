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
  retirementNumber: number;  
  @Output() textDisplayEvent = new EventEmitter<string>();

  constructor(private retirementCalc: RetirementCalcService) { }

  ngOnInit(): void {
    this.formModel.currentAge = 25;
    this.formModel.retirementAge = 65;
    this.formModel.growthRate = 7;
    this.formModel.startPrincipal = 175000;
    this.formModel.contributions = 0;
  }

  OnSubmit(){
    this.retirementNumber = this.retirementCalc.calculate(this.formModel);
  }

  emitTextValue(event){
    this.textDisplayEvent.emit(event.target.name);
  }

}
