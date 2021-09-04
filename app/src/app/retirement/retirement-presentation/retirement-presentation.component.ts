import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { calculateContent, contributionsContent, currentAgeContent, growthRateContent, introContent, retirementAgeContent, startPrincipalContent } from "../retirement-info";

@Component({
  selector: 'app-retirement-presentation',
  templateUrl: './retirement-presentation.component.html',
  styleUrls: ['./retirement-presentation.component.css']
})
export class RetirementPresentationComponent implements OnChanges {
  cardImageSource: string = '';
  displayedText: string = '';
  cardTitleText: string = '';
  @Input() textValue = '';
  @Input() retirementValue: number;

  constructor() { }

  ngOnInIt(): void {
    this.displayedText = introContent.bodyText;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.retirementValue){
      if(changes.retirementValue.currentValue === undefined){
        this.cardTitleText = introContent.headerText;
        this.displayedText = introContent.bodyText
        this.cardImageSource = introContent.bodyImage;
      }
      else{      
        this.displayedText = calculateContent.bodyText
     }
    }
    
    if(changes.textValue){
    switch (changes.textValue.currentValue) {
      case 'currentAge':
        this.displayedText = currentAgeContent.bodyText;
        this.cardImageSource = currentAgeContent.bodyImage;
        this.cardTitleText = currentAgeContent.headerText;
        break;
      case 'retirementAge':
        this.displayedText = retirementAgeContent.bodyText
        this.cardImageSource = retirementAgeContent.bodyImage;
        this.cardTitleText = retirementAgeContent.headerText;
        break;
      case 'startPrincipal': 
        this.displayedText = startPrincipalContent.bodyText;
        this.cardImageSource = startPrincipalContent.bodyImage;
        this.cardTitleText = startPrincipalContent.headerText;
        break;
      case 'contributions':
        this.displayedText = contributionsContent.bodyText;
        this.cardImageSource = contributionsContent.bodyImage;
        this.cardTitleText = contributionsContent.headerText;
        break;
      case 'growthRate':
        this.displayedText = growthRateContent.bodyText;
        this.cardImageSource = growthRateContent.bodyImage;
        this.cardTitleText = growthRateContent.headerText;
        break;
      case 'calculate':
        this.displayedText = calculateContent.bodyText
      default:
        break;
  }
}
  }
}
