import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { StorageKey } from '../enums/storage.enum';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  showSideNav: boolean = environment.loggedIn;
  userDisplayName: string = '';
  constructor(private route: Router, private storage: StorageService) { }

  ngOnInit() {
    let user = this.storage.getData(StorageKey.userData);
    this.userDisplayName = user.username;
  }

  showUser() {

  }

  async logout() {
    this.storage.removeAll();
    environment.loggedIn = false;
    this.route.navigate(['/login'])
  }

}
