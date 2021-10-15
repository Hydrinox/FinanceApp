import { HttpClient } from '@angular/common/http';
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

  async getExpenses(userID: string): Promise<ExpenseItem[]> {
    //check for and return expenses from localstorage
    let localItems = this.storageService.getData(StorageKey.expenseData);
    if (localItems) return localItems;

    //find expenses by userid, set in localstorage
    const res = await this.http.get<ExpenseItem[]>(`${this.baseURL}/expenses/${userID}`).toPromise();
    this.storageService.setData(StorageKey.expenseData, res);
    return res;
  }

  async getIncome(userID: string) {
    //check for and return income from localstorage
    let localIncome = this.storageService.getData(StorageKey.incomeData);
    if (localIncome) return localIncome;

    //find income by userid, set in localstorage
    const res = await this.http.get<IncomeItem>(`${this.baseURL}/income/${userID}`).toPromise();
    this.storageService.setData(StorageKey.incomeData, res);
    return res;
  }

  async deleteExpense(expenseId: number, userID: string): Promise<ExpenseItem[]> {
    await this.http.delete(`${this.baseURL}/expenses/${expenseId}`).toPromise();
    const getRes = await this.http.get<ExpenseItem[]>(`${this.baseURL}/expenses/${userID}`).toPromise();
    this.storageService.setData(StorageKey.expenseData, getRes);
    return getRes;
  }

  async updateIncome(body: IncomeItem): Promise<IncomeItem> {
    await this.http.put(`${this.baseURL}/income/${body._id}`, body).toPromise();
    const getRes = await this.http.get<IncomeItem>(`${this.baseURL}/income/${body._id}`).toPromise();
    this.storageService.setData(StorageKey.incomeData, getRes);
    return getRes;
  }

  async updateExpense(body: ExpenseItem, userID: string = '', expenseID: string = '',): Promise<ExpenseItem[]> {
    await this.http.put<ExpenseItem>(`${this.baseURL}/expenses/${expenseID}`, body).toPromise();
    const getRes = await this.http.get<ExpenseItem[]>(`${this.baseURL}/expenses/${userID}`).toPromise();
    this.storageService.setData(StorageKey.expenseData, getRes);
    return getRes;
  }
}
