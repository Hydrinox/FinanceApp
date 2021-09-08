import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BudgetItem } from '../models/BudgetItem';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  constructor(private http: HttpClient) { }

  base: string = `${environment.API_URL}/expenses`;

  budgetRequest(requestType: string, url: string, body: BudgetItem, expenseId: string = ''): Observable<BudgetItem | BudgetItem[]>{
    if(requestType === 'post' || requestType === 'patch'){
      return this.http[requestType]<BudgetItem | BudgetItem[]>(`${this.base}/${expenseId}`, {body});
    } else {
      return this.http[requestType]<BudgetItem | BudgetItem[]>(`${this.base}/${expenseId}`);
    }
  }
}
