import { CurrencyPipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { BudgetItem } from "../../models/BudgetItem";

const ELEMENT_DATA: BudgetItem[] = [
  { name: 'Car Payment', amount: 2.00, category: 'expense'},
  { name: 'Car Payment', amount: 2.00, category: 'expense'},
  { name: 'Car Payment', amount: 2.00, category: 'expense'},
  { name: 'Car Payment', amount: 2.00, category: 'expense'},
  { name: 'Car Payment', amount: 2.00, category: 'expense'},
  { name: 'Car Payment', amount: 2.00, category: 'expense'},
  { name: 'Car Payment', amount: 2.00, category: 'expense'},
  { name: 'Car Payment', amount: 2.00, category: 'expense'},
  { name: 'Car Payment', amount: 2.00, category: 'expense'},
  { name: 'Car Payment', amount: 2.00, category: 'expense'},];

@Component({
  selector: 'app-budgeting-form',
  templateUrl: './budgeting-form.component.html',
  styleUrls: ['./budgeting-form.component.css']
})
export class BudgetingFormComponent implements OnInit {
  displayedColumns: string[] = ['name', 'amount'];
  dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit(): void {
  }

  @ViewChild(MatTable) table: MatTable<BudgetItem>;
  
  getTotalCost() {
    return this.dataSource.map(t => t.amount).reduce((acc, value) => acc + value, 0);
  }

  addData() {
    const randomElementIndex = Math.floor(Math.random() * ELEMENT_DATA.length);
    this.dataSource.push(ELEMENT_DATA[randomElementIndex]);
    this.table.renderRows();
  }

  removeData() {
    this.dataSource.pop();
    this.table.renderRows();
  }

}
