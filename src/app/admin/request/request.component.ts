import { Component, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { LoanDetailsComponent } from '../loan-details/loan-details.component';
import { CreditCardDetailsComponent } from '../credit-card-details/credit-card-details.component';
import { CustomerRequestComponent } from '../customer-request/customer-request.component';
import { JuristicRequestComponent } from '../juristic-request/juristic-request.component';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrl: './request.component.scss'
})
export class RequestComponent {

  requests: any[] = [];
  filteredRequests: any[] = [];
  searchQuery: string = '';
  activeIndex = 0
  tabs = [
    { title: 'Loan Request', component: LoanDetailsComponent },
    { title: 'Credit Card Request', component: CreditCardDetailsComponent },
    { title: 'Customer Request', component: CustomerRequestComponent },
    { title: 'Juristic Request', component: JuristicRequestComponent },
  ];
  @ViewChild('dynamicComponentContainer', { read: ViewContainerRef }) container!: ViewContainerRef;
  totalPendingRequests: number = 0; // Total of all pending requests
  juristicPending: number = 0;
  customerPending: number = 0;
  loanPending: number = 0;
  creditPending: number = 0;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private adminService:AdminService
  ) {}

  ngOnInit(): void {
    this.getRequests();
    this.getDashboardData()
  }

  ngAfterViewInit(): void {
    this.loadComponent(this.tabs[this.activeIndex].component); // Load the first tab by default
  }

  getRequests() {
    this.requests = [

    ];
    this.filteredRequests = this.requests;
  }

  filterRequests(): void {
    const query = this.searchQuery.toLowerCase().trim();
    if (query) {
      this.filteredRequests = this.requests.filter((request) =>
        request.requestId.toLowerCase().includes(query) ||
        request.customerName.toLowerCase().includes(query)
      );
    } else {
      this.filteredRequests = this.requests;
    }
  }


  onTabChange(index: number) {
    this.activeIndex = index;  // Update activeIndex when a tab is clicked
    this.loadComponent(this.tabs[this.activeIndex].component); // Load the selected tab's component
  }


  loadComponent(component: any) {
    if (this.container) {
      this.container.clear(); // Clear previous components
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
      this.container.createComponent(componentFactory); // Load the new component
    }
  }

  openFilterDialog() {
    // Open a dialog or perform filtering logic
  }

  approveRequest(request:string) {
    // Handle approval logic or API call
  }

  viewRequest(request:string) {
    // Open a dialog or navigate to a page to view request details
  }

  deleteRequest(request:string) {
    if (confirm('Are you sure you want to delete this request?')) {
      // Handle deletion logic or API call
    }
  }


  getDashboardData() {
    this.adminService.get('/dashboardGet').subscribe((res) => {
      if (res.dataStatus) {
        this.juristicPending = res.result.juristicDashboard[0]?.pending || 0;
        this.customerPending = res.result.customerDashboard[0]?.pending || 0;
        this.loanPending = res.result.loanReqDashboard[0]?.pending || 0;
        this.creditPending = res.result.creditReqDashboard[0]?.pending || 0;

        // Calculate total pending requests
        this.totalPendingRequests = this.juristicPending + this.customerPending + this.loanPending + this.creditPending;

        console.log('Pending Juristic Requests:', this.juristicPending);
        console.log('Pending Customer Requests:', this.customerPending);
        console.log('Pending Loan Requests:', this.loanPending);
        console.log('Pending Credit Requests:', this.creditPending);
        console.log('Total Pending Requests:', this.totalPendingRequests);
      } else {
        console.error('Failed to fetch dashboard data');
      }
    });
  }
  
  
  // calculateTotalRequests(): number {
  //   const customerTotal = this.customerDashboard.total || 0;
  //   const juristicTotal = this.juristicDashboard.total || 0;
  //   const loanTotal = this.loanReqDashboard.total || 0;
  //   const creditTotal = this.creditReqDashboard.total || 0;
  
  //   return customerTotal + juristicTotal + loanTotal + creditTotal;
  // }

}
