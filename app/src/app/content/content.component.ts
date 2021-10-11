import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  loggedIn: boolean = false;
  constructor(private auth: AuthService) { }

  async ngOnInit() {
    this.loggedIn = await this.auth.isAuthenticated();
  }

  setLoginStatus(res) {
    this.loggedIn = res;
  }

}
