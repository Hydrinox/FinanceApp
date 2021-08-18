import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-retirement-presentation',
  templateUrl: './retirement-presentation.component.html',
  styleUrls: ['./retirement-presentation.component.css']
})
export class RetirementPresentationComponent implements OnChanges {
  currentAgeText: string = "Arguably the most important part of calculating your ending retirement number. If you haven't already started saving, now is the second best time to start. Compounding growth is very powerful and starting early starts the snowball rolling";
  retireAgeText: string = "retirement age text";
  startingPrincipalText: string = "principal text";
  contributionsText: string = "contribution text";
  growthRateText: string = "growth rate text";
  submittedCalculationText: string = "this is submitted calculation text";
  displayedText: string = '';
  @Input() value = '';

  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    switch (changes.value.currentValue) {
      case 'currentAge':
        this.displayedText = this.currentAgeText;
        break;
      case 'retirementAge':
        this.displayedText = this.retireAgeText;
        break;
      case 'startPrincipal': 
        this.displayedText = this.startingPrincipalText;
        break;
      case 'contributions':
        this.displayedText = this.contributionsText;
        break;
      case 'growthRate':
        this.displayedText = this.growthRateText;
        break;
      case 'calculate':
        this.displayedText = this.submittedCalculationText;
      default:
        break;
  }
  }
}
