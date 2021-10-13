import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { StorageService } from './storage.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoggedinAuthGuardService implements CanActivate {

  constructor(private auth: AuthService, private storage: StorageService, private route: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> {
    return new Observable<boolean>(obs => {
      this.auth.isAuthenticated().subscribe(
        res => {
          console.log("loginauth guard auth response", res);
          this.route.navigate(['/dashboard']);
          environment.loggedIn = true;
          obs.next(false);
        },
        err => {
          console.log("loginauth guard auth err response", err);
          obs.next(true)
        }
      )
    })
  }

  checkAuthentication() {

  }
}
