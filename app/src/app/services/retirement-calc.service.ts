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

  private baseURL: string = `${environment.API_URL}`;

  constructor(private http: HttpClient, private storageService: StorageService) { }

  async getRetirement(userID: string): Promise<Retirement> {
    //check for and return retirement from localstorage
    let localItems = this.storageService.getData(StorageKey.retirementForm);
    if (localItems) return localItems;

    //find retirement by userid, set in localstorage
    let res = await this.http.get<Retirement>(`${this.baseURL}/retirement/${userID}`).toPromise();
    this.storageService.setData(StorageKey.retirementForm, res);
    return res;
  }

  async updateRetirement(body: Retirement): Promise<Retirement> {
    await this.http.put(`${this.baseURL}/retirement/${body._id}`, body).toPromise();
    const getRes = await this.http.get<Retirement>(`${this.baseURL}/retirement/${body._id}`).toPromise();
    this.storageService.setData(StorageKey.retirementForm, getRes);
    return getRes;
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

      return principalTotalGrowth + contributionGrowth;
    }
    //P(1 + i)^n  compounding growth formula if no contributions
    return principalTotalGrowth;
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
