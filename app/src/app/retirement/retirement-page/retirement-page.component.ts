import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-retirement-page',
  templateUrl: './retirement-page.component.html',
  styleUrls: ['./retirement-page.component.css']
})
export class RetirementPageComponent implements OnInit {
  textToDisplayValue = '';
  numberToDisplay: number;

  constructor() { }

  ngOnInit(): void {
  }

  setTextDisplayValue(value: string){
    this.textToDisplayValue = value;
  }

  setRetirementNumber(number: number){
    this.numberToDisplay = number;
  }
}
