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
  contributionsText: string = "This should include contributions to your 401k, 403b, IRA, etc. It is recommended that this number should be around 15% of the your gross income to best prepare yourself to retire comfortably. Contributing more than this would allow you to retire earlier or retire with a larger nest egg.";
  growthRateText: string = "growth rate text";
  submittedCalculationText: string = "this is submitted calculation text";
  cardImageSource: string = '';
  displayedText: string = '';
  @Input() textValue = '';
  @Input() retirementValue: number;

  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes.textValue){
    switch (changes.textValue.currentValue) {
      case 'currentAge':
        this.displayedText = this.currentAgeText;
        this.cardImageSource = '../../../assets/clock-2696234_640.jpg';
        break;
      case 'retirementAge':
        this.displayedText = this.retireAgeText;
        this.cardImageSource = '../../../assets/lake-1802337_1920.jpg';
        break;
      case 'startPrincipal': 
        this.displayedText = this.startingPrincipalText;
        this.cardImageSource = '../../../assets/retirement-3585585_640.jpg';
        break;
      case 'contributions':
        this.displayedText = this.contributionsText;
        this.cardImageSource = '../../../assets/piggy-bank-621068_640.jpg';
        break;
      case 'growthRate':
        this.displayedText = this.growthRateText;
        this.cardImageSource = '../../../assets/DJIA_Chart.png';
        break;
      case 'calculate':
        this.displayedText = this.submittedCalculationText;
      default:
        break;
  }
}
  }
}
