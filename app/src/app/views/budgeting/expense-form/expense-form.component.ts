import { Component, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { ExpenseItem } from 'src/app/models/ExpenseItem';
import { BudgetService } from 'src/app/services/budget.service';
import { StorageService } from 'src/app/services/storage.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-expense-form',
  templateUrl: './expense-form.component.html',
  styleUrls: ['./expense-form.component.css']
})
export class ExpenseFormComponent implements OnInit {
  displayedColumns: string[] = ['name', 'amount', 'action'];
  expenseArray: ExpenseItem[];
  step = 0;
  userID: string;
  @Output() expenseChanges = new EventEmitter<any>();

  constructor(public dialog: MatDialog, private budgetService: BudgetService, private storage: StorageService, private utils: UtilsService) { }

  async ngOnInit() {
    this.userID = this.storage.getUserID();
    if (!this.userID) { this.utils.logout(); }
    else {
      this.budgetService.getExpenses(this.userID).then(res => {
        this.expenseArray = res;
      });
    }
  }

  @ViewChild(MatTable) table: MatTable<ExpenseItem>;

  getTotalCost() {
    if (this.expenseArray) {
      return this.expenseArray.map(t => t.value).reduce((acc, value) => acc + value, 0);
    }
  }

  async addData(newItem: ExpenseItem) {
    if (newItem) {
      try {
        await this.budgetService.updateExpense(newItem, this.userID);
        this.expenseArray = await this.budgetService.getExpenses(this.userID);
        this.expenseChanges.emit(this.expenseArray);

        this.table.renderRows();
      }
      catch (err) {
        this.utils.logout();
      }
    }
  }

  async editData(oldItem: ExpenseItem, newItem: ExpenseItem) {
    if (newItem) {
      try {
        await this.budgetService.updateExpense(newItem, this.userID, String(oldItem._id))
        this.expenseArray = await this.budgetService.getExpenses(this.userID);
        this.expenseChanges.emit(this.expenseArray);

        this.table.renderRows();
      }
      catch (err) {
        this.utils.logout();
      }
    }
  }

  async removeData(item: ExpenseItem) {
    try {
      this.expenseArray = await this.budgetService.deleteExpense(item._id, this.userID);
      this.expenseChanges.emit(this.expenseArray);
      this.table.renderRows();
    }
    catch (err) {
      this.utils.logout();
    }
  }

  openDialog(item?: ExpenseItem): void {
    if (item) {
      var dialogRef = this.dialog.open(ExpenseFormDialog, {
        autoFocus: false,
        width: '250px',
        data: { name: item.name, value: item.value }
      });

      dialogRef.afterClosed().subscribe(result => {
        this.editData(item, result)
      });
    }
    else {
      var dialogRef = this.dialog.open(ExpenseFormDialog, {
        autoFocus: false,
        width: '250px',
        data: { name: this.expenseArray['name'], value: this.expenseArray['value'], user: this.userID }
      });

      dialogRef.afterClosed().subscribe(result => {
        this.addData(result)
      });
    }


  }


}

//Component for expense popup dialog
@Component({
  selector: 'expense-dialog',
  templateUrl: './expense-dialog.html',
  styleUrls: ['./expense-form.component.css']
})
export class ExpenseFormDialog {

  constructor(
    public dialogRef: MatDialogRef<ExpenseFormDialog>,
    @Inject(MAT_DIALOG_DATA) public data: ExpenseItem) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
