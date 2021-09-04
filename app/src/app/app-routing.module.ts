import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutPageComponent } from './about-page/about-page.component';
import { BudgetingPageComponent } from './budgeting/budgeting-page/budgeting-page.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { RetirementPageComponent } from './retirement/retirement-page/retirement-page.component';

const routes: Routes = [
  {path: 'landing', component: LandingPageComponent},
  {path: 'budgeting', component: BudgetingPageComponent},
  {path: 'retirement', component: RetirementPageComponent},
  {path: 'about', component: AboutPageComponent},
  {path: '', redirectTo: 'landing', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
