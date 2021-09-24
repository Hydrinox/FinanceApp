import { Component, OnInit } from '@angular/core';
import { StorageKey } from 'src/app/enums/storage.enum';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-retirement-page',
  templateUrl: './retirement-page.component.html',
  styleUrls: ['./retirement-page.component.css']
})
export class RetirementPageComponent implements OnInit {
  textToDisplayValue = '';
  numberToDisplay: number;
  retirement: Array<object>;

  constructor(private storageService: StorageService) { }

  ngOnInit(): void {
    this.retirement = JSON.parse(this.storageService.getData(StorageKey.retirementTimeline));
  }

  setTextDisplayValue(value: string) {
    this.textToDisplayValue = value;
  }

  setRetirementNumber(number: number) {
    this.numberToDisplay = number;
  }
}
