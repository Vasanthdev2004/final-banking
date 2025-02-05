import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { JuristicManagementComponent } from './juristic-management/juristic-management.component';
import { CustomerManagementComponent } from './customer-management/customer-management.component';
import { RequestComponent } from './request/request.component';
import { ProductSuggestionComponent } from './product-suggestion/product-suggestion.component';
import { LoanCreationComponent } from './loan-creation/loan-creation.component';
import { CreditCardCreationComponent } from './credit-card-creation/credit-card-creation.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { LoanDetailsComponent } from './loan-details/loan-details.component';
import { CreditCardDetailsComponent } from './credit-card-details/credit-card-details.component';
import { CustomerRequestComponent } from './customer-request/customer-request.component';
import { JuristicRequestComponent } from './juristic-request/juristic-request.component';
import { CustomerLoanComponent } from './customer-loan/customer-loan.component';
import { JuristicLoanComponent } from './juristic-loan/juristic-loan.component';
import { CustomerCreditCardComponent } from './customer-credit-card/customer-credit-card.component';
import { JuristicCreditCardComponent } from './juristic-credit-card/juristic-credit-card.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { JuristicDetailsComponent } from './juristic-details/juristic-details.component';
import { CustomerPageComponent } from './customer-page/customer-page.component';
import { JuristicPageComponent } from './juristic-page/juristic-page.component';


@NgModule({
  declarations: [
    JuristicManagementComponent,
    CustomerManagementComponent,
    RequestComponent,
    ProductSuggestionComponent,
    LoanCreationComponent,
    CreditCardCreationComponent,
    DashboardComponent,
    LoanDetailsComponent,
    CreditCardDetailsComponent,
    CustomerRequestComponent,
    JuristicRequestComponent,
    CustomerLoanComponent,
    JuristicLoanComponent,
    CustomerCreditCardComponent,
    JuristicCreditCardComponent,
    CustomerDetailsComponent,
    JuristicDetailsComponent,
    CustomerPageComponent,
    JuristicPageComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
  ]
})
export class AdminModule { }
