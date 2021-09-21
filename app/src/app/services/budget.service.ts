import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ExpenseItem } from '../models/ExpenseItem';
import { IncomeItem } from "../models/IncomeItem";

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  constructor(private http: HttpClient) { }

  base: string = `${environment.API_URL}`;

  expenseRequest(requestType: string, url: string, body: ExpenseItem, expenseId: string = ''): Observable<ExpenseItem | ExpenseItem[]> {
    if (requestType === 'post' || requestType === 'patch') {
      return this.http[requestType]<ExpenseItem | ExpenseItem[]>(`${this.base}/expenses/${expenseId}`, { body });
    } else {
      return this.http[requestType]<ExpenseItem | ExpenseItem[]>(`${this.base}/expenses/${expenseId}`);
    }
  }

  incomeRequest(requestType: string, url: string, body: IncomeItem, incomeId: string = ''): Observable<IncomeItem> {
    if (requestType === 'post' || requestType === 'patch') {
      return this.http[requestType]<IncomeItem>(`${this.base}/income/${incomeId}`, { body });
    } else {
      return this.http[requestType]<IncomeItem>(`${this.base}/income/${incomeId}`);
    }
  }
}
