import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { mergeMap } from 'rxjs/operators';
import { ExpenseItem } from 'src/app/models/ExpenseItem';
import { BudgetService } from 'src/app/services/budget.service';

@Component({
  selector: 'app-expense-form',
  templateUrl: './expense-form.component.html',
  styleUrls: ['./expense-form.component.css']
})
export class ExpenseFormComponent implements OnInit {
  displayedColumns: string[] = ['name', 'amount', 'action'];
  expenseArray: Array<ExpenseItem>;
  step = 0;

  constructor(public dialog: MatDialog, private budgetService: BudgetService) { }

  ngOnInit(): void {
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
      return this.expenseArray.map(t => t.value).reduce((acc, value) => acc + value, 0);
    }
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
        data: {name: item.name, value: item.value}});

        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
          this.editData(item, result)
        });
    }
    else{
      var dialogRef = this.dialog.open(BudgetFormDialog, {
        width: '250px',
        data: {name: this.expenseArray['name'], value: this.expenseArray['value']}
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.addData(result)
      });
    }
  
    
  }

  
}

@Component({
  selector: 'budgeting-dialog',
  templateUrl: './budgeting-dialog.html',
  styleUrls: ['./expense-form.component.css']
})
export class BudgetFormDialog {

  constructor(
    public dialogRef: MatDialogRef<BudgetFormDialog>,
    @Inject(MAT_DIALOG_DATA) public data: ExpenseItem) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
