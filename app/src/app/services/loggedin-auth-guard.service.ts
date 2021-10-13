import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedinAuthGuardService {

  constructor(private auth: AuthService, private storage: StorageService, private route: Router) { }

  canActivate() {
    this.auth.isAuthenticated().subscribe(
      res => {
        environment.loggedIn = true;
        this.route.navigate(['/dashboard']);
      },
      err => {
        return true;
      }
    )
  }
}
