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
  })

  private base: string = `${environment.API_URL}`;

  constructor(private http: HttpClient, private storageService: StorageService) { }

  async retirementRequest(requestType: string, url: string, body: Retirement, retirementId: string = '') {
    if (requestType === 'put' || requestType === 'post') {
      try {
        body.user = await this.storageService.getUserID();
        const res = await this.http[requestType]<Retirement>(`${this.base}/retirement/${body.user}`, { body }).toPromise();
        const getRes: any = await this.http.get<Retirement>(`${this.base}/retirement/${body.user}`).toPromise();
        this.storageService.setData(StorageKey.retirementForm, getRes);
        return res;
      } catch (e) {
        console.log('retirement service error', e)
      }
    } else {
      try {
        if (requestType === 'get') {
          let retireStorage = this.storageService.getData(StorageKey.retirementForm);
          if (retireStorage) {
            return JSON.parse(retireStorage);
          }
          const res: any = await this.http[requestType]<Retirement>(`${this.base}/retirement/${retirementId}`).toPromise();
          this.storageService.setData(StorageKey.retirementForm, res);
          return res;

        }
        const res: any = await this.http[requestType]<Retirement>(`${this.base}/retirement/${retirementId}`).toPromise();
        const getRes: any = await this.http.get(`${this.base}/retirement/${body.user}`);
        this.storageService.setData(StorageKey.retirementForm, getRes);

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

    let principalTotalGrowth = (retirementFields.startPrincipal * Math.pow((1 + r), n));

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

  calculateRetirementTimeline(retirementFields: Retirement): any[] {
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
