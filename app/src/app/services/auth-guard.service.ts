import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private auth: AuthService, private utils: UtilsService) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> {
    return new Observable<boolean>(obs => {
      this.auth.isAuthenticated().subscribe(
        res => {
          console.log("auth guard auth response", res);
          obs.next(true);
        },
        err => {
          console.log("this is authguard error", err);
          this.utils.logout();
          obs.next(false);
        }
      )
    })
  }
}
