import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private auth: AuthService, private route: Router) { }

  async canActivate() {
    if (await this.auth.isAuthenticated()) {
      return true;
    }
    this.route.navigate(['/login']);
    return false;
  }
}
