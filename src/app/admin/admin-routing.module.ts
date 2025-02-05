import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { JuristicManagementComponent } from './juristic-management/juristic-management.component';
import { RequestComponent } from './request/request.component';
import { CustomerManagementComponent } from './customer-management/customer-management.component';
import { ProductSuggestionComponent } from './product-suggestion/product-suggestion.component';
import { LoanCreationComponent } from './loan-creation/loan-creation.component';
import { CreditCardCreationComponent } from './credit-card-creation/credit-card-creation.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { JuristicDetailsComponent } from './juristic-details/juristic-details.component';
import { CustomerPageComponent } from './customer-page/customer-page.component';
import { JuristicPageComponent } from './juristic-page/juristic-page.component';

const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'juristic-person-management', component: JuristicManagementComponent },
    { path: 'request', component: RequestComponent },
    { path: 'customer-management', component: CustomerManagementComponent },
    { path: 'product-suggestion-logics', component: ProductSuggestionComponent },
    // { path: 'products-master', component: ProductsMasterComponent },
    // { path: 'reports', component: ReportsComponent },
    // { path: 'contact-us', component: ContactUsComponent },
    { path: 'loan-creation', component: LoanCreationComponent },
    { path: 'credit-card-creation', component: CreditCardCreationComponent },
    { path:"customer-detail/:id", component:CustomerDetailsComponent},
    { path:"juristic-detail/:id", component:JuristicDetailsComponent},
    { path:"customer-page/:id", component:CustomerPageComponent},
    { path:"juristic-page/:id", component:JuristicPageComponent},
    // { path:'customer-management/:id',component:CustomerLayoutComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
