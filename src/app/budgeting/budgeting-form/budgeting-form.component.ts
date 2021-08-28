import { CurrencyPipe } from '@angular/common';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { BudgetItem } from "../../models/BudgetItem";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

const ELEMENT_DATA: BudgetItem[] = [
  { name: 'Car Payment', amount: 300, category: 'expense'},
  { name: 'Rent', amount: 1300, category: 'expense'},
  { name: 'Groceries', amount: 300, category: 'expense'},
  { name: 'Phone Bill', amount: 55, category: 'expense'},
  { name: 'Utilities', amount: 200, category: 'expense'},
  { name: 'Restaurants', amount: 200, category: 'expense'},
  { name: 'Gym', amount: 35, category: 'expense'},
  { name: 'Gas', amount: 60, category: 'expense'},
];

@Component({
  selector: 'app-budgeting-form',
  templateUrl: './budgeting-form.component.html',
  styleUrls: ['./budgeting-form.component.css']
})
export class BudgetingFormComponent implements OnInit {
  displayedColumns: string[] = ['name', 'amount', 'action'];
  dataSource = ELEMENT_DATA;
  selected = 'option1';
  step = 0;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  @ViewChild(MatTable) table: MatTable<BudgetItem>;
  
  getTotalCost() {
    return this.dataSource.map(t => t.amount).reduce((acc, value) => acc + value, 0);
  }

  addData(newItem: BudgetItem) {
    if(newItem.name === undefined || newItem.amount === undefined){
      return;
    }    
    this.dataSource.push(newItem);
    this.table.renderRows();
  }

  editData(oldItem: BudgetItem, newItem: BudgetItem){
    if(newItem.name === undefined || newItem.amount === undefined){
      return;
    }    
    this.dataSource.splice(this.dataSource.findIndex(obj => obj.name == oldItem.name), 1, newItem);
    this.table.renderRows();
  }

  removeData(item) {
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
