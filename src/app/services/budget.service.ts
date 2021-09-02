import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

url = '';

  constructor(private http: HttpClient) { }

  GetBudgetItems() {
     this.http.get(this.url);
  }

}
