import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BudgetItem } from '../models/BudgetItem';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

url = '';

  constructor(private http: HttpClient) { }

  getBudgetItems(): Observable<BudgetItem[]> {
    return this.http.get<BudgetItem[]>(environment.API_URL + '/expenses');
  }

  createExpense(expense: BudgetItem): Observable<BudgetItem> {
    return this.http.post<BudgetItem>(`${environment.API_URL}/expenses`, { expense });
  }

  deleteExpense(expense: BudgetItem): Observable<BudgetItem> {
    return this.http.delete<BudgetItem>(`${environment.API_URL}/expenses/${expense._id}`);
  }

  editExpense(oldExpense: BudgetItem, updatedExpense: BudgetItem): Observable<BudgetItem> {
    return this.http.patch<BudgetItem>(`${environment.API_URL}/expenses/${oldExpense._id}`, { updatedExpense });
  }

}
