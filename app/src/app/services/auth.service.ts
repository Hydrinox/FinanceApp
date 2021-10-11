import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageKey } from '../enums/storage.enum';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private storage: StorageService) { }

  async login() {
    let callback;
    const win = window.open('http://localhost:3000/auth/google', "mywindow", "location=1,status=1,scrollbars=1, width=800,height=800");
    window.addEventListener('message', (message) => {
      //message will contain facebook user and details
      if (message) {
        return this.isAuthenticated();
      }
    });
  }

  async isAuthenticated(): Promise<boolean> {
    try {
      let res = await this.http.get('http://localhost:3000/auth', {
        withCredentials: true,
        responseType: 'text'
      }).toPromise();
      return res === 'true';
    } catch (error) {
      console.log(error)
      return false;
    }
  }

  async getUser() {
    let userStorage = this.storage.getData(StorageKey.userData);
    if (userStorage) {
      return JSON.parse(userStorage);
    }
    let res = await this.http.get('http://localhost:3000/auth/user', {
      withCredentials: true,
      responseType: 'text'
    }).toPromise();
    if (res === 'false') {
      return [];
    }
    this.storage.setData(StorageKey.userData, JSON.parse(res));
    return res;
  }

  async logout() {
    try {
      let res = await this.http.get('http://localhost:3000/auth/logout', {
        withCredentials: true,
        responseType: 'text'
      }).toPromise();
      return res === 'OK';
    } catch (error) {
      console.log(error)
      return false;
    }
  }
}