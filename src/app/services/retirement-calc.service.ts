import { Injectable } from '@angular/core';
import { RetirementForm } from "../models/RetirementForm";

@Injectable({
  providedIn: 'root'
})
export class RetirementCalcService {
  private formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  })

  formFieldValues: RetirementForm = new RetirementForm();

  constructor() { }

  calculate(retirementForm){
    let n = retirementForm.retirementAge - retirementForm.currentAge;
    let r = retirementForm.growthRate / 100;
    let contributions = retirementForm.contributions * 12;

    let principalTotalGrowth = (retirementForm.startPrincipal * Math.pow((1 + r), n)) + retirementForm.startPrincipal;

    if(retirementForm.contributions > 0){
    //[ P(1+r/n)^(nt) ] + [ PMT × (((1 + r/n)^(nt) - 1) / (r/n)) ] formula if monthly contributions
      let contributionGrowth = 0;
      for(let i = 0; i < n; i++){
        contributionGrowth += contributions * Math.pow((1 + r), n - i);
      }
      
    return this.formatter.format(principalTotalGrowth + contributionGrowth);
    }
  //P(1 + i)^n  compounding growth formula if no contributions
  return this.formatter.format(principalTotalGrowth);
  }

  saveFormState(form: RetirementForm){
    this.formFieldValues.currentAge = form.currentAge;
    this.formFieldValues.retirementAge = form.retirementAge;
    this.formFieldValues.startPrincipal = form.startPrincipal;
    this.formFieldValues.contributions = form.contributions;
    this.formFieldValues.growthRate = form.growthRate;
  }
}
