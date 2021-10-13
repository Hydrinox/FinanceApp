import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private auth: AuthService, private storage: StorageService, private route: Router) { }

  canActivate() {
    this.auth.isAuthenticated().subscribe(
      res => {
        console.log("auth guard auth response", res);
        return true;
      },
      err => {
        console.log("this is authguard error", err);
        environment.loggedIn = false;
        this.route.navigate(['/login']);
        return false;
      }
    )
    return true;
  }
}
