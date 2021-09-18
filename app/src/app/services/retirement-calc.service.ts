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
      return this.http[requestType]<Retirement>(`${this.base}/retirement/${retirementId}`);
    }
  }

  calculate(retirementForm: Retirement) {
    let n = retirementForm.retirementAge - retirementForm.currentAge;
    let r = retirementForm.growthRate / 100;
    let contributions = retirementForm.contributions * 12;

    let principalTotalGrowth = (retirementForm.startPrincipal * Math.pow((1 + r), n)) + retirementForm.startPrincipal;

    if (retirementForm.contributions > 0) {
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

  saveFormState(form: Retirement) {
    this.formFieldValues.currentAge = form.currentAge;
    this.formFieldValues.retirementAge = form.retirementAge;
    this.formFieldValues.startPrincipal = form.startPrincipal;
    this.formFieldValues.contributions = form.contributions;
    this.formFieldValues.growthRate = form.growthRate;
  }
}
