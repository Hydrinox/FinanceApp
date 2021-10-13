import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { transitionAnimation } from '../animations';
import { StorageKey } from '../enums/storage.enum';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [transitionAnimation]
})
export class LoginComponent implements OnInit {
  hidePassword = true;

  constructor(private auth: AuthService, private storage: StorageService, private router: Router) { }

  loginForm: any = {
    username: null,
    password: null
  }

  async ngOnInit() {
    let tokenStore = this.storage.getUserID();
    if (tokenStore) {
      this.auth.isAuthenticated().subscribe(
        res => {
          if (res) {
            this.router.navigate(['/dashboard']);
          }
          err => {
            console.log("login init error", err);
            environment.loggedIn = false;
          }
        }
      );
    }
  }

  async submitLogin() {
    try {
      this.auth.login(this.loginForm.username, this.loginForm.password).subscribe(
        res => {
          this.storage.saveToken(res.authToken);
          this.storage.saveUser(res);
          environment.loggedIn = true;
        },
        err => console.log("this is error", err),
        () => {
          this.router.navigate(['/dashboard']);
          console.log("haha");
        }
      );
    }
    catch (err) {
      console.log("this is login fail", err);
    }
  }
}
