import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { StorageKey } from '../enums/storage.enum';
import { Retirement } from "../models/Retirement";
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class RetirementCalcService {
  private formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  })

  base: string = `${environment.API_URL}`;

  constructor(private http: HttpClient, private storageService: StorageService) { }

  async retirementRequest(requestType: string, url: string, body: Retirement, retirementId: string = '') {
    if (requestType === 'post' || requestType === 'patch') {
      try {
        const res = await this.http[requestType]<Retirement>(`${this.base}/retirement/${retirementId}`, { body }).toPromise();
        this.storageService.setData(StorageKey.retirementForm, res);
      } catch (e) {
        console.log('retirement service error', e)
      }
    } else {
      try {
        const res = await this.http[requestType]<Retirement>(`${this.base}/retirement/${retirementId}`).toPromise();
        this.storageService.setData(StorageKey.retirementForm, res);
        return res;
      } catch (e) {
        console.log('retirement service error', e)
      }
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
        currentDate.getFullYear() + 1 + i,
        retirementAmount.toFixed()
      ]
      dataArr.push(dataObject);
    }
    return dataArr;
  }
}
