import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-retirement-form',
  templateUrl: './retirement-form.component.html',
  styleUrls: ['./retirement-form.component.css']
})
export class RetirementFormComponent implements OnInit {

  currentAge: number;
  retirementAge: number = 65;
  growthRate: number = 7;
  startAmount: number = 175000;
  contribution: number;
  retirementNumber: number;

  constructor() { }

  ngOnInit(): void {
  }

  calculate(){
    //P(1 + i)n  compounding growth formula
    let n = this.retirementAge - this.currentAge;
    let i = this.growthRate / 100;

    this.retirementNumber = this.startAmount * Math.pow((1 + i), n);

  }

}
