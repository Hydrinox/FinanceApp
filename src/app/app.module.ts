import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BudgetingFormComponent } from './budgeting/budgeting-form/budgeting-form.component';
import { BudgetingPresentationComponent } from './budgeting/budgeting-presentation/budgeting-presentation.component';
import { RetirementFormComponent } from './retirement/retirement-form/retirement-form.component';
import { RetirementPresentationComponent } from './retirement/retirement-presentation/retirement-presentation.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { RetirementPageComponent } from './retirement/retirement-page/retirement-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BudgetingFormComponent,
    BudgetingPresentationComponent,
    RetirementFormComponent,
    RetirementPresentationComponent,
    LandingPageComponent,
    AboutPageComponent,
    RetirementPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
