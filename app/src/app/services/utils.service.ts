import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from './storage.service';
import { environment } from "../../environments/environment";
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  baseURL: string = environment.API_URL;

  constructor(private storage: StorageService, private route: Router, private http: HttpClient) { }

  displaySpinner() {
    let overlay = document.getElementById('spinner');
    overlay?.classList.add('show');
  }

  hideSpinner() {
    let overlay = document.getElementById('spinner');
    overlay?.classList.remove('show');
  }

  async logout() {
    await this.http.get(`${this.baseURL}/auth/logout`).toPromise();
    this.storage.removeAll();
    environment.loggedIn = false;
    this.route.navigate(['/login'])
  }
}
