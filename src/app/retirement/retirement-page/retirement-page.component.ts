import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-retirement-page',
  templateUrl: './retirement-page.component.html',
  styleUrls: ['./retirement-page.component.css']
})
export class RetirementPageComponent implements OnInit {
  textToDisplayValue = '';

  constructor() { }

  ngOnInit(): void {
  }

  setTextDisplayValue(value){
    this.textToDisplayValue = value;
  }
}
