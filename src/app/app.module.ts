import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BudgetingFormComponent } from './budgeting-page/budgeting-form/budgeting-form.component';
import { BudgetingPresentationComponent } from './budgeting-page/budgeting-presentation/budgeting-presentation.component';
import { RetirementFormComponent } from './retirement-page/retirement-form/retirement-form.component';
import { RetirementPresentationComponent } from './retirement-page/retirement-presentation/retirement-presentation.component';
import { LandingPageComponent } from './landing-page/landing-page.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BudgetingFormComponent,
    BudgetingPresentationComponent,
    RetirementFormComponent,
    RetirementPresentationComponent,
    LandingPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
