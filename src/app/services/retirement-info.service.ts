import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RetirementInfoService {

displayedText: string;
private bodyText: {} = {
  currentAge : "Arguably the most important part of calculating your ending retirement number. If you haven't already started saving, now is the second best time to start. Compounding growth is very powerful and starting early starts the snowball rolling",
  retirementAge : "retirement age text",
  startPrincipal : "principal text",
  contributions : "This should include contributions to your 401k, 403b, IRA, etc. It is recommended that this number should be around 15% of the your gross income to best prepare yourself to retire comfortably. Contributing more than this would allow you to retire earlier or retire with a larger nest egg.",
  growthRate : "growth rate text",
  calculate : "this is submitted calculation text",
  retireNumberText : "this is retirement number text",
  Intro : 'Welcome to Retirement Calculator'
}

  constructor() { }

  GetBodyText(text?: string){
   return this.displayedText = undefined || '' ? 'This is placeholder for null' : this.bodyText[text];
  }
}
