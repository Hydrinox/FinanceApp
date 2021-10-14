import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { StorageKey } from '../enums/storage.enum';
import { ExpenseItem } from '../models/ExpenseItem';
import { IncomeItem } from "../models/IncomeItem";
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  router: Router;
  base: string = `${environment.API_URL}`;

  constructor(private http: HttpClient, private storageService: StorageService) { }

  //TODO: need to refactor this

  async getExpenses() {
    let user = this.storageService.getUserID();
    if (!user) {
      environment.loggedIn = false;
      return false;
    }
    const res: any = await this.http.get<ExpenseItem | ExpenseItem[]>(`${this.base}/expenses/${user}`).toPromise();
    this.storageService.setData(StorageKey.expenseData, res);
    return res;
  }

  async getIncome() {
    let user = this.storageService.getUserID();
    const res: any = await this.http.get<IncomeItem | IncomeItem[]>(`${this.base}/expenses/${user}`).toPromise();
    this.storageService.setData(StorageKey.incomeData, res);
    return res;
  }

  async expenseRequest(requestType: string, url: string, body: ExpenseItem, expenseId: string = '') {
    if (requestType === 'post' || requestType === 'patch') {
      try {
        body.user = this.storageService.getUserID();
        const res: any = await this.http[requestType]<ExpenseItem | ExpenseItem[]>(`${this.base}/expenses/${expenseId}`, body).toPromise();
        const getRes: any = await this.http.get<ExpenseItem | ExpenseItem[]>(`${this.base}/expenses/${body.user}`).toPromise();
        this.storageService.setData(StorageKey.expenseData, getRes);
        return res;
      }
      catch (e) {
        console.log('budget service error', e)
      }
    } else {
      try {
        if (requestType === 'get') {
          let expenseStorage = this.storageService.getData(StorageKey.expenseData);
          if (expenseStorage) {
            return expenseStorage;
          }
          expenseId = await this.storageService.getUserID();

          const res: any = await this.http[requestType]<ExpenseItem | ExpenseItem[]>(`${this.base}/expenses/${expenseId}`).toPromise();
          this.storageService.setData(StorageKey.expenseData, res);
          return res;

        }
        const res: any = await this.http[requestType]<ExpenseItem | ExpenseItem[]>(`${this.base}/expenses/${expenseId}`).toPromise();
        const getRes: any = await this.getExpenses();
        return res;
      }
      catch (e) {
        console.log('budget service error', e)
      }
    }
  }

  //TODO: need to refactor this
  async incomeRequest(requestType: string, url: string, body: IncomeItem, incomeId: string = '') {
    if (requestType === 'post' || requestType === 'put') {
      try {
        body.user = await this.storageService.getUserID();
        const res = await this.http[requestType]<IncomeItem>(`${this.base}/income/${body.user}`, body).toPromise();
        const getRes = await this.http.get<IncomeItem>(`${this.base}/income/${body.user}`).toPromise();
        this.storageService.setData(StorageKey.incomeData, getRes);

        return res;
      } catch (e) {
        console.log('income service error', e)
      }
    } else {
      try {
        if (requestType === 'get') {
          let incomeStorage = this.storageService.getData(StorageKey.incomeData);
          if (incomeStorage) {
            return incomeStorage;
          }
          incomeId = await this.storageService.getUserID();
          const res = await this.http[requestType]<IncomeItem>(`${this.base}/income/${incomeId}`).toPromise();
          this.storageService.setData(StorageKey.incomeData, res);
          return res;
        }
        const res = await this.http[requestType]<IncomeItem>(`${this.base}/income/${incomeId}`).toPromise();
        const getRes: any = await this.http.get<ExpenseItem | ExpenseItem[]>(`${this.base}/income`).toPromise();
        this.storageService.setData(StorageKey.expenseData, getRes);
        return res;
      } catch (e) {
        console.log('income service error', e)
      }
    }
  }
}
