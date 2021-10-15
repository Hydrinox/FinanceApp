import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { StorageKey } from '../../enums/storage.enum';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  showSideNav: boolean = environment.loggedIn;
  userDisplayName: string = '';
  constructor(private route: Router, private storage: StorageService, private utils: UtilsService) { }

  ngOnInit() {
    let user = this.storage.getData(StorageKey.userData);
    this.userDisplayName = user.username;
  }

  logout() {
    this.utils.logout();
  }

}
