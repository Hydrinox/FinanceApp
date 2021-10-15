import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { StorageKey } from '../enums/storage.enum';
import { ExpenseItem } from '../models/ExpenseItem';
import { IncomeItem } from "../models/IncomeItem";
import { StorageService } from './storage.service';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  router: Router;
  baseURL: string = `${environment.API_URL}`;

  constructor(private http: HttpClient, private storageService: StorageService, private utils: UtilsService) { }

  async getExpenses() {
    //check if user in cache, 
    let user = this.storageService.getUserID();
    if (!user) {
      this.utils.logout();
      return null;
    }
    const res: any = await this.http.get<ExpenseItem | ExpenseItem[]>(`${this.baseURL}/expenses/${user}`).toPromise();
    this.storageService.setData(StorageKey.expenseData, res);
    return res;
  }

  async getIncome() {
    let user = this.storageService.getUserID();
    const res: any = await this.http.get<IncomeItem | IncomeItem[]>(`${this.baseURL}/expenses/${user}`).toPromise();
    this.storageService.setData(StorageKey.incomeData, res);
    return res;
  }

  async deleteExpense(expenseId: string) {
    await this.http.delete(`${this.baseURL}/expenses/${expenseId}`).toPromise();
  }

  async expenseRequest(requestType: string, url: string, body: ExpenseItem, expenseId: string = '') {
    if (requestType === 'post' || requestType === 'patch') {
      try {
        body.user = this.storageService.getUserID();
        const res: any = await this.http[requestType]<ExpenseItem | ExpenseItem[]>(`${this.baseURL}/expenses/${expenseId}`, body).toPromise();
        const getRes: any = await this.http.get<ExpenseItem | ExpenseItem[]>(`${this.baseURL}/expenses/${body.user}`).toPromise();
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

          const res: any = await this.http[requestType]<ExpenseItem | ExpenseItem[]>(`${this.baseURL}/expenses/${expenseId}`).toPromise();
          this.storageService.setData(StorageKey.expenseData, res);
          return res;
        }
        const res: any = await this.http[requestType]<ExpenseItem | ExpenseItem[]>(`${this.baseURL}/expenses/${expenseId}`).toPromise();
        await this.getExpenses();
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
        const res = await this.http[requestType]<IncomeItem>(`${this.baseURL}/income/${body.user}`, body).toPromise();
        const getRes = await this.http.get<IncomeItem>(`${this.baseURL}/income/${body.user}`).toPromise();
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
          const res = await this.http[requestType]<IncomeItem>(`${this.baseURL}/income/${incomeId}`).toPromise();
          this.storageService.setData(StorageKey.incomeData, res);
          return res;
        }
        const res = await this.http[requestType]<IncomeItem>(`${this.baseURL}/income/${incomeId}`).toPromise();
        const getRes: any = await this.http.get<ExpenseItem | ExpenseItem[]>(`${this.baseURL}/income`).toPromise();
        this.storageService.setData(StorageKey.expenseData, getRes);
        return res;
      } catch (e) {
        console.log('income service error', e)
      }
    }
  }
}
