import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BudgetingPageComponent } from './views/budgeting/budgeting-page/budgeting-page.component';
import { DashboardPageComponent } from './views/dashboard/dashboard-page/dashboard-page.component';
import { LoginComponent } from './views/login/login.component';
import { RetirementPageComponent } from './views/retirement/retirement-page/retirement-page.component';
import { AuthGuardService } from "./services/auth-guard.service";
import { LoggedinAuthGuardService } from './services/loggedin-auth-guard.service';

const routes: Routes = [
  { path: 'dashboard', component: DashboardPageComponent, canActivate: [AuthGuardService] },
  { path: 'budgeting', component: BudgetingPageComponent, canActivate: [AuthGuardService] },
  { path: 'retirement', component: RetirementPageComponent, canActivate: [AuthGuardService] },
  { path: 'login', component: LoginComponent, canActivate: [LoggedinAuthGuardService] },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full', canActivate: [AuthGuardService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
