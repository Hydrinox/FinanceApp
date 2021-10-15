import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { transitionAnimation } from '../../animations';
import { StorageKey } from '../../enums/storage.enum';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [transitionAnimation]
})
export class LoginComponent implements OnInit {
  hidePassword = true;
  errorMsg: string = null;
  successMsg: string = null;

  constructor(public dialog: MatDialog, private auth: AuthService, private storage: StorageService, private router: Router) { }

  loginForm: any = {
    username: '',
    password: ''
  }

  async ngOnInit() {

  }

  async submitLogin() {
    try {
      this.auth.login(this.loginForm.username, this.loginForm.password).subscribe(
        res => {
          this.storage.saveToken(res.authToken);
          this.storage.saveUser(res);
          environment.loggedIn = true;
        },
        err => {
          console.log("this is error", err);
          this.errorMsg = err.error.message;
        },
        () => {
          this.router.navigate(['/dashboard']);
        }
      );
    }
    catch (err) {
      console.log("this is login fail", err);
    }
  }


  openDialog(): void {
    var dialogRef = this.dialog.open(RegisterFormDialog, {
      autoFocus: false,
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loginForm.username = result.username;
      this.successMsg = 'Registered Successfully';
    });
  }
}

//Component for register popup dialog
@Component({
  selector: 'register-dialog',
  templateUrl: './register-dialog.html',
  styleUrls: ['./login.component.css']
})
export class RegisterFormDialog {
  errorMsg: string = null;
  registerForm: any = {
    email: null,
    username: null,
    password: null
  }
  constructor(
    public dialogRef: MatDialogRef<RegisterFormDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any, private auth: AuthService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    this.auth.register(this.registerForm.email, this.registerForm.username, this.registerForm.password).subscribe(
      res => {
        this.dialogRef.close(this.registerForm);
      },
      err => {
        console.log("register fail", err);
        this.errorMsg = err.error.message;
      }
    );
  }

}
