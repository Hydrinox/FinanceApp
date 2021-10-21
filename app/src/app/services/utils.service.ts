import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from './storage.service';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private storage: StorageService, private route: Router) { }

  displaySpinner() {
    let overlay = document.getElementById('spinner');
    overlay?.classList.add('show');
  }

  hideSpinner() {
    let overlay = document.getElementById('spinner');
    overlay?.classList.remove('show');
  }

  logout() {
    this.storage.removeAll();
    environment.loggedIn = false;
    this.route.navigate(['/login'])
  }
}
