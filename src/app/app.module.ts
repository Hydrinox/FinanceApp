import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from "@angular/material/table";
import { MatIcon, MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatButtonModule } from "@angular/material/button";
import { MatTabsModule } from "@angular/material/tabs";
import { MatCardModule } from "@angular/material/card";


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
import { BudgetingPageComponent } from "./budgeting/budgeting-page/budgeting-page.component";


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
    RetirementPageComponent,
    BudgetingPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    MatTabsModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }