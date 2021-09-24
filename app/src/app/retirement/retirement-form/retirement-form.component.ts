import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RetirementCalcService } from "../../services/retirement-calc.service";
import { Retirement } from "../../models/Retirement";
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
  @Output() textDisplayEvent = new EventEmitter<string>();
  @Output() retirementNumberEvent = new EventEmitter<string>();

  constructor(private retirementCalc: RetirementCalcService, private storageService: StorageService) { }

  async ngOnInit() {
    const formRes = this.storageService.getData(StorageKey.retirementForm);
    if (formRes) {
      this.formModel = JSON.parse(formRes);
    } else {
      const retireRes = await this.retirementCalc.retirementRequest('get', '', null, '');
      this.formModel = retireRes;
    }
  }

  async OnSubmit() {
    await this.retirementCalc.retirementRequest('post', '', this.formModel);
    this.retirementNumber = this.retirementCalc.calculateRetirementTotal(this.formModel);
    this.retirementNumberEvent.emit(this.retirementCalc.calculateRetirementTotal(this.formModel));
  }

  emitTextValue(event: any) {
    this.textDisplayEvent.emit(event.target.name);
  }

}
