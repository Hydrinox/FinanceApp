import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RetirementCalcService } from "../../services/retirement-calc.service";
import { Retirement } from "../../models/Retirement";

@Component({
  selector: 'app-retirement-form',
  templateUrl: './retirement-form.component.html',
  styleUrls: ['./retirement-form.component.scss']
})
export class RetirementFormComponent implements OnInit {
  formModel = new Retirement();
  retirementNumber: string;
  @Output() textDisplayEvent = new EventEmitter<string>();
  @Output() retirementNumberEvent = new EventEmitter<string>();

  constructor(private retirementCalc: RetirementCalcService) { }

  ngOnInit(): void {
    this.retirementCalc.retirementRequest('get', '', null, '')
      .subscribe((retirementFields: Retirement) => {
        this.formModel = retirementFields[0];
      },
        (error: ErrorEvent) => {
          console.log(error, "Error with getting retirement values")
        });
    // this.formModel = this.retirementCalc.formFieldValues ? this.retirementCalc.formFieldValues : this.formModel;
    // this.formModel.startPrincipal = this.retirementCalc.formFieldValues.startPrincipal ? this.retirementCalc.formFieldValues.startPrincipal : 0;
    // this.formModel.growthRate = this.retirementCalc.formFieldValues.growthRate ? this.retirementCalc.formFieldValues.growthRate : 7;
  }

  OnSubmit() {
    this.retirementCalc.saveFormState(this.formModel);
    this.retirementCalc.retirementRequest('post', '', this.formModel).subscribe(() => {
      console.log(this.formModel);
    });
    this.retirementNumber = this.retirementCalc.calculateRetirementTotal(this.formModel);
    this.retirementNumberEvent.emit(this.retirementCalc.calculateRetirementTotal(this.formModel));
  }

  emitTextValue(event: any) {
    this.textDisplayEvent.emit(event.target.name);
  }

}
