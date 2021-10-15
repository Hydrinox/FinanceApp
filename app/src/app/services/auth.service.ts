import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { StorageKey } from '../enums/storage.enum';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  base: string = 'http://localhost:3000';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient, private storage: StorageService) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(this.base + '/auth/signin', {
      username,
      password
    }, this.httpOptions);
  }

  register(email: string, username: string, password: string): Observable<any> {
    return this.http.post(this.base + '/auth/register', {
      email,
      username,
      password
    }, this.httpOptions);
  }

  isAuthenticated() {
    let user = this.storage.getUserID();
    return user ? true : false;
    // return this.http.get(this.base + '/auth/authenticate', { headers: { Authorization: `Bearer ${token}` } });
  }
}