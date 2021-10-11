import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  @Output() loggedInEvent = new EventEmitter();
  userDisplayName: string = '';
  userImage: string = '';
  constructor(private auth: AuthService, private route: Router, private storage: StorageService) { }

  async ngOnInit() {

    await this.auth.getUser().then(res => {
      this.userDisplayName = res.displayName;
      this.userImage = res.image;
    });
  }

  showUser() {

  }

  async logout() {
    await this.auth.logout();
    this.storage.removeAll();
    this.loggedInEvent.emit(false);
    this.route.navigate(['/login'])
  }

}
