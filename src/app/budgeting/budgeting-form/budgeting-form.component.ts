import { CurrencyPipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { BudgetItem } from "../../models/BudgetItem";

const ELEMENT_DATA: BudgetItem[] = [
  {position: 1, name: 'Car Payment', amount: 2.00, category: 'expense'},
  {position: 1, name: 'Car Payment', amount: 2.00, category: 'expense'},
  {position: 1, name: 'Car Payment', amount: 2.00, category: 'expense'},
  {position: 1, name: 'Car Payment', amount: 2.00, category: 'expense'},
  {position: 1, name: 'Car Payment', amount: 2.00, category: 'expense'},
  {position: 1, name: 'Car Payment', amount: 2.00, category: 'expense'},
  {position: 1, name: 'Car Payment', amount: 2.00, category: 'expense'},
  {position: 1, name: 'Car Payment', amount: 2.00, category: 'expense'},
  {position: 1, name: 'Car Payment', amount: 2.00, category: 'expense'},
  {position: 1, name: 'Car Payment', amount: 2.00, category: 'expense'},];

@Component({
  selector: 'app-budgeting-form',
  templateUrl: './budgeting-form.component.html',
  styleUrls: ['./budgeting-form.component.css']
})
export class BudgetingFormComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'amount', 'category'];
  dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit(): void {
  }

  @ViewChild(MatTable) table: MatTable<BudgetItem>;
  
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
