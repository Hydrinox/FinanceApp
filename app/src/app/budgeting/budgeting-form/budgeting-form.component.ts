import { CurrencyPipe } from '@angular/common';
import { Component, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { ExpenseItem } from "../../models/ExpenseItem";
import { IncomeItem } from "../../models/IncomeItem";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BudgetService } from 'src/app/services/budget.service';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-budgeting-form',
  templateUrl: './budgeting-form.component.html',
  styleUrls: ['./budgeting-form.component.css']
})
export class BudgetingFormComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}


