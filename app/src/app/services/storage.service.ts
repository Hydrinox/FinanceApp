import { Injectable } from '@angular/core';
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
