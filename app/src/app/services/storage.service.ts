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

  removeAll() {
    localStorage.clear();
  }

  getUserID() {
    let user = JSON.parse(localStorage.getItem(StorageKey.userData));
    return user.googleId;
  }
}
