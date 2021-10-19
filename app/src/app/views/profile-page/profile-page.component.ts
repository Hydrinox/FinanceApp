import { Component, OnInit } from '@angular/core';
import { transitionAnimation } from 'src/app/animations';
import { StorageKey } from 'src/app/enums/storage.enum';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
  animations: [transitionAnimation]
})
export class ProfilePageComponent implements OnInit {
  profile = {
    username: '',
    email: '',
    createdAt: ''
  }
  constructor(private storage: StorageService) { }

  ngOnInit(): void {
    this.profile = this.storage.getData(StorageKey.userData);
  }

}
