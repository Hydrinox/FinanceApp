import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BudgetingPageComponent } from './budgeting/budgeting-page/budgeting-page.component';
import { DashboardPageComponent } from './dashboard/dashboard-page/dashboard-page.component';
import { RetirementPageComponent } from './retirement/retirement-page/retirement-page.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardPageComponent },
  { path: 'budgeting', component: BudgetingPageComponent },
  { path: 'retirement', component: RetirementPageComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
