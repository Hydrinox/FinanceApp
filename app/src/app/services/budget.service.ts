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

  async expenseRequest(requestType: string, url: string, body: ExpenseItem, expenseId: string = '') {
    if (requestType === 'post' || requestType === 'patch') {
      try {
        const res: any = await this.http[requestType]<ExpenseItem | ExpenseItem[]>(`${this.base}/expenses/${expenseId}`, { body }).toPromise();
        this.storageService.setData(StorageKey.expenseData, res);
        return res;
      }
      catch (e) {
        console.log('budget service error', e)
      }
    } else {
      try {
        const res: any = await this.http[requestType]<ExpenseItem | ExpenseItem[]>(`${this.base}/expenses/${expenseId}`).toPromise();
        this.storageService.setData(StorageKey.expenseData, res);
        return res;
      }
      catch (e) {
        console.log('budget service error', e)
      }
    }
  }

  async incomeRequest(requestType: string, url: string, body: IncomeItem, incomeId: string = '') {
    if (requestType === 'post' || requestType === 'patch') {
      try {
        const res = await this.http[requestType]<IncomeItem>(`${this.base}/income/${incomeId}`, { body }).toPromise();
        this.storageService.setData(StorageKey.incomeData, res);
        return res;
      } catch (e) {
        console.log('budget service error', e)
      }
    } else {
      try {
        const res = await this.http[requestType]<IncomeItem>(`${this.base}/income/${incomeId}`).toPromise();
        this.storageService.setData(StorageKey.incomeData, res);
        return res;
      } catch (e) {
        console.log('budget service error', e)
      }
    }
  }
}
