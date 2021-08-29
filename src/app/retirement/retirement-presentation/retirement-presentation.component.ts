import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { RetirementInfoService } from 'src/app/services/retirement-info.service';

@Component({
  selector: 'app-retirement-presentation',
  templateUrl: './retirement-presentation.component.html',
  styleUrls: ['./retirement-presentation.component.css']
})
export class RetirementPresentationComponent implements OnChanges {
  cardImageSource: string = '';
  displayedText: string = '';
  @Input() textValue = '';
  @Input() retirementValue: number;

  constructor(private retireInfo: RetirementInfoService) { }

  ngOnInIt(): void {
    this.displayedText = this.retireInfo.GetBodyText();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.retirementValue){
      if(changes.retirementValue.currentValue === undefined){
        this.displayedText = this.retireInfo.GetBodyText('Intro');
      }
      else{      
        this.displayedText = this.retireInfo.GetBodyText('calculate');
     }
    }
    
    if(changes.textValue){
    switch (changes.textValue.currentValue) {
      case 'currentAge':
        this.displayedText = this.retireInfo.GetBodyText('currentAge');
        this.cardImageSource = '../../../assets/clock-2696234_640.jpg';
        break;
      case 'retirementAge':
        this.displayedText = this.retireInfo.GetBodyText('retirementAge'); 
        this.cardImageSource = '../../../assets/lake-1802337_1920.jpg';
        break;
      case 'startPrincipal': 
        this.displayedText = this.retireInfo.GetBodyText('startPrincipal');
        this.cardImageSource = '../../../assets/retirement-3585585_640.jpg';
        break;
      case 'contributions':
        this.displayedText = this.retireInfo.GetBodyText('contributions');
        this.cardImageSource = '../../../assets/piggy-bank-621068_640.jpg';
        break;
      case 'growthRate':
        this.displayedText = this.retireInfo.GetBodyText('growthRate');
        this.cardImageSource = '../../../assets/DJIA_Chart.png';
        break;
      case 'calculate':
        this.displayedText = this.retireInfo.GetBodyText('calculate');
      default:
        break;
  }
}
  }
}
