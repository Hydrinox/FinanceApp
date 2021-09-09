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
  displayedColumns: string[] = ['name', 'amount', 'action'];
  expenseArray: Array<ExpenseItem>;
  incomeArray: Array<IncomeItem>;
  payFrequency = 'yearly';
  incomeValue: number;
  step = 0;

  constructor(public dialog: MatDialog, private budgetService: BudgetService) { }

  ngOnInit(): void {
    this.budgetService.incomeRequest('get', '', null, '')
    .subscribe((incomes: IncomeItem[]) => {
      this.incomeArray = incomes;
      this.incomeValue = incomes[0] ? incomes[0].amount : null;
    },
    (error: ErrorEvent) => {
      console.log(error, "Error with getting income items")
    })

    this.budgetService.expenseRequest('get', '', null, '')
      .subscribe((expenses: ExpenseItem[]) => {
        this.expenseArray = expenses;
      },
      (error: ErrorEvent) => {
        console.log(error, "Error with getting budget items")
      })
  }

  @ViewChild(MatTable) table: MatTable<ExpenseItem>;
  
  getTotalCost() {
    if(this.expenseArray){
      return this.expenseArray.map(t => t.amount).reduce((acc, value) => acc + value, 0);
    }
  }

  submitIncome(){
    let incomeItem: IncomeItem = {
      amount: this.incomeValue,
      frequency: this.payFrequency,
    }
    this.budgetService.incomeRequest('post', '', incomeItem)
    .pipe(
      mergeMap(() => this.budgetService.incomeRequest('get', '', null, ''))
    )
    .subscribe((incomes: IncomeItem[]) => {
      this.incomeArray = incomes;
    }          
  )
  }

  addData(newItem: ExpenseItem) {
    if(newItem){
      this.budgetService.expenseRequest('post', '', newItem)
        .pipe(
          mergeMap(() => this.budgetService.expenseRequest('get', '', null, ''))
        )
        .subscribe((expenses: ExpenseItem[]) => {
          this.expenseArray = expenses;
        }          
      )
      this.table.renderRows();
    }    
  }

  editData(oldItem: ExpenseItem, newItem: ExpenseItem){
    if(newItem){
    this.budgetService.expenseRequest('patch', '', newItem, String(oldItem._id))
      .pipe(
        mergeMap(() => this.budgetService.expenseRequest('get', '', null, '')))
      .subscribe((expenses: ExpenseItem[]) => {
        this.expenseArray = expenses;
      });
    this.table.renderRows();
    }     
  }

  removeData(item: ExpenseItem): void {
    this.budgetService.expenseRequest('delete', '', null, String(item._id))
      .pipe(
        mergeMap(() => this.budgetService.expenseRequest('get', '', null, '')))
        .subscribe((expenses: ExpenseItem[]) => {
          this.expenseArray = expenses;
        });
    this.table.renderRows();
  }

  openDialog(item?: ExpenseItem): void {
    if(item){
      var dialogRef = this.dialog.open(BudgetFormDialog, {
        width: '250px',
        data: {name: item.name, amount: item.amount}});

        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
          this.editData(item, result)
        });
    }
    else{
      var dialogRef = this.dialog.open(BudgetFormDialog, {
        width: '250px',
        data: {name: this.expenseArray['name'], amount: this.expenseArray['amount']}
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.addData(result)
      });
    }
  
    
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

}

@Component({
  selector: 'budgeting-dialog',
  templateUrl: './budgeting-dialog.html',
  styleUrls: ['./budgeting-form.component.css']
})
export class BudgetFormDialog {

  constructor(
    public dialogRef: MatDialogRef<BudgetFormDialog>,
    @Inject(MAT_DIALOG_DATA) public data: ExpenseItem) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
