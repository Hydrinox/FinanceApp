import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private auth: AuthService, private utils: UtilsService) { }
  //Checks if logged in
  canActivate() {
    if (this.auth.isAuthenticated()) {
      environment.loggedIn = true;
      return true;
    } else {
      this.utils.logout();
      return false
    }
  }
}
