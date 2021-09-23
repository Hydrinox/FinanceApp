import { Injectable } from '@angular/core';
import { ExpenseItem } from '../models/ExpenseItem';
import { IncomeItem } from '../models/IncomeItem';
import { Retirement } from '../models/Retirement';
import { StorageKey } from '../enums/storage.enum';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  getData(key: StorageKey) {
    return localStorage.getItem(key);
  }

  setData(key: StorageKey, data) {
    const jsonData = JSON.stringify(data);
    localStorage.setItem(key, jsonData);
  }

  removeData(key: StorageKey) {
    localStorage.removeItem(key);
  }
}
