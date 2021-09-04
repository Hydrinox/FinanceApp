import { CurrencyPipe } from '@angular/common';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { BudgetItem } from "../../models/BudgetItem";
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
  dataSource: Array<BudgetItem>;
  selected = 'option1';
  step = 0;

  constructor(public dialog: MatDialog, private budgetService: BudgetService) { }

  ngOnInit(): void {
    this.budgetService.getBudgetItems()
      .subscribe((expenses: BudgetItem[]) => {
        this.dataSource = expenses;
      },
      (error: ErrorEvent) => {
        console.log(error, "Error with getting budget items")
      })
  }

  @ViewChild(MatTable) table: MatTable<BudgetItem>;
  
  getTotalCost() {
    if(this.dataSource){
      return this.dataSource.map(t => t.amount).reduce((acc, value) => acc + value, 0);
    }
  }

  addData(newItem: BudgetItem) {
    if(newItem){
      this.budgetService.createExpense(newItem)
        .pipe(
          mergeMap(() => this.budgetService.getBudgetItems())
        )
        .subscribe((expenses: BudgetItem[]) => {
          this.dataSource = expenses;
        }          
      )
      this.table.renderRows();
    }    
  }

  editData(oldItem: BudgetItem, newItem: BudgetItem){
    if(newItem){
    this.dataSource.splice(this.dataSource.findIndex(obj => obj.name == oldItem.name), 1, newItem);
    this.table.renderRows();
    }     
  }

  removeData(item: BudgetItem): void {
    this.dataSource = this.dataSource.filter(i => i !== item)
    this.table.renderRows();
  }

  openDialog(item?: BudgetItem): void {
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
        data: {name: this.dataSource['name'], amount: this.dataSource['amount']}
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
    @Inject(MAT_DIALOG_DATA) public data: BudgetItem) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
