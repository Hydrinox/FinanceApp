import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Retirement } from "../models/Retirement";

@Injectable({
  providedIn: 'root'
})
export class RetirementCalcService {
  private formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  })

  formFieldValues: Retirement = new Retirement();

  base: string = `${environment.API_URL}`;

  constructor(private http: HttpClient) { }

  retirementRequest(requestType: string, url: string, body: Retirement, retirementId: string = ''): Observable<Retirement> {
    if (requestType === 'post' || requestType === 'patch') {
      return this.http[requestType]<Retirement>(`${this.base}/retirement/${retirementId}`, { body });
    } else {
      let res = this.http[requestType]<Retirement>(`${this.base}/retirement/${retirementId}`);
      this.formFieldValues = res;
      return res;
    }
  }

  calculateRetirementTotal(retirementFields: Retirement) {
    let n = retirementFields.retirementAge - retirementFields.currentAge;
    let r = retirementFields.growthRate / 100;
    let contributions = retirementFields.contributions * 12;

    let principalTotalGrowth = (retirementFields.startPrincipal * Math.pow((1 + r), n)) + retirementFields.startPrincipal;

    if (retirementFields.contributions > 0) {
      //[ P(1+r/n)^(nt) ] + [ PMT × (((1 + r/n)^(nt) - 1) / (r/n)) ] formula if monthly contributions
      let contributionGrowth = 0;
      for (let i = 0; i < n; i++) {
        contributionGrowth += contributions * Math.pow((1 + r), n - i);
      }

      return this.formatter.format(principalTotalGrowth + contributionGrowth);
    }
    //P(1 + i)^n  compounding growth formula if no contributions
    return this.formatter.format(principalTotalGrowth);
  }

  calculateRetirementTimeline(retirementFields: Retirement) {
    const n: number = retirementFields.retirementAge - retirementFields.currentAge;
    const r: number = retirementFields.growthRate / 100;
    const contributions: number = retirementFields.contributions * 12;
    const currentDate: Date = new Date();

    let dataArr = [];
    let retirementAmount: number = retirementFields.startPrincipal;

    for (let i = 0; i < n; i++) {

      retirementAmount += (retirementAmount * r);
      retirementAmount += (contributions * (1 + r));


      let dataObject = [
        currentDate.getFullYear() + i,
        retirementAmount.toFixed()
      ]
      dataArr.push(dataObject);
    }
    return dataArr;
  }

  saveFormState(form: Retirement) {
    this.formFieldValues.currentAge = form.currentAge;
    this.formFieldValues.retirementAge = form.retirementAge;
    this.formFieldValues.startPrincipal = form.startPrincipal;
    this.formFieldValues.contributions = form.contributions;
    this.formFieldValues.growthRate = form.growthRate;
  }
}
