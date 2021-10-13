import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from "@angular/material/table";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatButtonModule } from "@angular/material/button";
import { MatTabsModule } from "@angular/material/tabs";
import { MatCardModule } from "@angular/material/card";
import { MatDividerModule } from "@angular/material/divider";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSelectModule } from "@angular/material/select";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxEchartsModule } from 'ngx-echarts';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RetirementFormComponent } from './retirement/retirement-form/retirement-form.component';
import { RetirementPageComponent } from './retirement/retirement-page/retirement-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BudgetingPageComponent } from "./budgeting/budgeting-page/budgeting-page.component";
import { DashboardPageComponent } from './dashboard/dashboard-page/dashboard-page.component';
import { BudgetChartComponent } from './charts/budget-chart/budget-chart.component';
import { RetirementChartComponent } from './charts/retirement-chart/retirement-chart.component';

import 'echarts/theme/dark.js';
import { BudgetFormDialog, ExpenseFormComponent } from './budgeting/expense-form/expense-form.component';
import { IncomeFormComponent } from './budgeting/income-form/income-form.component';
import { ExpenseChartComponent } from './charts/expense-chart/expense-chart.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { BudgetStackedChartComponent } from './charts/budget-stacked-chart/budget-stacked-chart.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    RetirementFormComponent,
    RetirementPageComponent,
    BudgetingPageComponent,
    DashboardPageComponent,
    BudgetChartComponent,
    RetirementChartComponent,
    BudgetFormDialog,
    ExpenseFormComponent,
    IncomeFormComponent,
    ExpenseChartComponent,
    SidenavComponent,
    BudgetStackedChartComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    MatTabsModule,
    MatDividerModule,
    MatCardModule,
    MatSnackBarModule,
    MatDialogModule,
    MatSidenavModule,
    MatListModule,
    MatSelectModule,
    NgxChartsModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
