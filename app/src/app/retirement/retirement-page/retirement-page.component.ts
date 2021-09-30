import { Component, OnInit } from '@angular/core';
import { StorageKey } from 'src/app/enums/storage.enum';
import { RetirementCalcService } from 'src/app/services/retirement-calc.service';
import { StorageService } from 'src/app/services/storage.service';
import { transitionAnimation } from "../../animations";

@Component({
  selector: 'app-retirement-page',
  templateUrl: './retirement-page.component.html',
  styleUrls: ['./retirement-page.component.css'],
  animations: [transitionAnimation]
})
export class RetirementPageComponent implements OnInit {
  textToDisplayValue = '';
  numberToDisplay: number;
  retirement: any[];

  constructor(private retirementService: RetirementCalcService) { }

  async ngOnInit() {
    this.retirementService.retirementRequest('get', '', null, '').then(res => this.retirement = this.retirementService.calculateRetirementTimeline(res));
  }

  setTimeline(value: []) {
    this.retirement = value;
  }

  setRetirementNumber(number: number) {
    this.numberToDisplay = number;
  }
}
