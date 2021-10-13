import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private auth: AuthService, private storage: StorageService, private route: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> {
    return new Observable<boolean>(obs => {
      this.auth.isAuthenticated().subscribe(
        res => {
          console.log("auth guard auth response", res);
          obs.next(true);
        },
        err => {
          console.log("this is authguard error", err);
          environment.loggedIn = false;
          this.route.navigate(['/login']);
          obs.next(false);
        }
      )
    })
  }
}
