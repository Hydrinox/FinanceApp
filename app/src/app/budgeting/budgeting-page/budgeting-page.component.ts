import { Component, OnInit } from '@angular/core';
import { ExpenseItem } from 'src/app/models/ExpenseItem';
import { transitionAnimation } from "../../animations";


@Component({
  selector: 'app-budgeting-page',
  templateUrl: './budgeting-page.component.html',
  styleUrls: ['./budgeting-page.component.css'],
  animations: [transitionAnimation]
})
export class BudgetingPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
