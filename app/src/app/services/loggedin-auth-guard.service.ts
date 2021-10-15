import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedinAuthGuardService implements CanActivate {

  constructor(private auth: AuthService, private route: Router) { }

  canActivate() {
    if (this.auth.isAuthenticated()) {
      this.route.navigate(['/dashboard']);
      environment.loggedIn = true;
      return false;
    } else {
      return true;
    }
  }
}