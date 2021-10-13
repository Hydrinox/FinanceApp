import { Injectable } from '@angular/core';
import { StorageKey } from '../enums/storage.enum';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  getData(key: StorageKey) {
    return JSON.parse(localStorage.getItem(key));
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
    if (user) return user.id
    return null;
  }

  getToken() {
    return localStorage.getItem(StorageKey.authToken);
  }

  saveToken(token: string) {
    localStorage.removeItem(StorageKey.authToken);
    localStorage.setItem(StorageKey.authToken, token);
  }

  saveUser(userData: any) {
    localStorage.removeItem(StorageKey.userData);
    localStorage.setItem(StorageKey.userData, JSON.stringify(userData));
  }

}
