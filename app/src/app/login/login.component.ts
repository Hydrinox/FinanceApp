import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { transitionAnimation } from '../animations';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [transitionAnimation]
})
export class LoginComponent implements OnInit {
  hidePassword = true;
  @Output() loggedInEvent = new EventEmitter();
  constructor(private auth: AuthService, private router: Router) { }

  async ngOnInit() {
    let loggedIn = await this.checkAuthentication();
    if (loggedIn) {
      this.router.navigate(['/dashboard']);
    } else {
      this.loggedInEvent.emit(loggedIn);
    }
  }

  async submitLogin() {
    try {
      let loginRes = await this.auth.login();
      if (loginRes) {
        let res = await this.auth.isAuthenticated();
        this.loggedInEvent.emit(res);
        this.auth.getUser().then(() => {
          this.router.navigate(['/dashboard']);
        });
      }
    }
    catch (err) {
      console.log("this is login fail", err);
    }
  }

  checkAuthentication(): Promise<boolean> {
    return this.auth.isAuthenticated();
  }
}
