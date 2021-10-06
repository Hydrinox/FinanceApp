import { Component, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
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
  @Output() expenseChanges = new EventEmitter<any>();

  constructor(public dialog: MatDialog, private budgetService: BudgetService) { }

  async ngOnInit() {
    this.budgetService.expenseRequest('get', '', null, '').then(res => {
      this.expenseArray = res;
    });
  }

  @ViewChild(MatTable) table: MatTable<ExpenseItem>;

  getTotalCost() {
    if (this.expenseArray) {
      return this.expenseArray.map(t => t.value).reduce((acc, value) => acc + value, 0);
    }
  }

  async addData(newItem: ExpenseItem) {
    if (newItem) {
      await this.budgetService.expenseRequest('post', '', newItem)
      this.expenseArray = await this.budgetService.expenseRequest('get', '', null, '');
      this.expenseChanges.emit(this.expenseArray);

      this.table.renderRows();
    }
  }

  async editData(oldItem: ExpenseItem, newItem: ExpenseItem) {
    if (newItem) {
      await this.budgetService.expenseRequest('patch', '', newItem, String(oldItem._id))
      this.expenseArray = await this.budgetService.expenseRequest('get', '', null, '');
      this.expenseChanges.emit(this.expenseArray);

      this.table.renderRows();
    }
  }

  async removeData(item: ExpenseItem) {
    await this.budgetService.expenseRequest('delete', '', null, String(item._id));
    this.expenseArray = await this.budgetService.expenseRequest('get', '', null, '');
    this.expenseChanges.emit(this.expenseArray);
    this.table.renderRows();
  }

  openDialog(item?: ExpenseItem): void {
    if (item) {
      var dialogRef = this.dialog.open(BudgetFormDialog, {
        autoFocus: false,
        width: '250px',
        data: { name: item.name, value: item.value }
      });

      dialogRef.afterClosed().subscribe(result => {
        this.editData(item, result)
      });
    }
    else {
      var dialogRef = this.dialog.open(BudgetFormDialog, {
        autoFocus: false,
        width: '250px',
        data: { name: this.expenseArray['name'], value: this.expenseArray['value'] }
      });

      dialogRef.afterClosed().subscribe(result => {
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
    @Inject(MAT_DIALOG_DATA) public data: ExpenseItem) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
