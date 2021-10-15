import { Component, OnInit } from '@angular/core';
import { transitionAnimation } from "../../../animations";

@Component({
  selector: 'app-retirement-page',
  templateUrl: './retirement-page.component.html',
  styleUrls: ['./retirement-page.component.css'],
  animations: [transitionAnimation]
})
export class RetirementPageComponent implements OnInit {
  numberToDisplay: number;
  retirement: any[];

  constructor() { }

  async ngOnInit() {

  }

  setTimeline(value: []) {
    this.retirement = value;
  }

  setRetirementNumber(number: number) {
    this.numberToDisplay = number;
  }
}
