import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-credit-card-details',
  templateUrl: './credit-card-details.component.html',
  styleUrl: './credit-card-details.component.scss'
})
export class CreditCardDetailsComponent {


  filteredProducts: any[] = []; 
  searchQuery: string = ''; 
  products: any[] = [];
  limit: number = 10; // Number of results per page
  offset: number = 0;
  approvevisible :boolean = false
  rejectvisible : boolean = false
  approveId: any = null;
  rejectId: any = null;

  ngOnInit() {
    this.getCustomerData();
  }


  constructor(private adminService: AdminService, private toastr: ToastrService,private router:Router) {
    
  }

  cancel(){
    this.rejectvisible = false
  }
  



  openFilterDialog(): void {
    console.log('Filter button clicked');
  }

  openAddJuristicPersonDialog() {
    // this.router.navigate(['/create-new-customer']);
    // this.selectedCustomer = {};
    // this.initValidators();
    // this.showForm = true;
  }




 
  approve() {
    let apiUrl = '/creditCardReqUpt';
    let data = {
      "records": {
        "id": this.approveId,
        "status": "2"
      }
    };

    this.adminService.post(apiUrl, data).subscribe(res => {
      this.getCustomerData();
      this.approvevisible = false
      if (res.dataStatus) {
        this.toastr.success(res.message, 'Success');
        // Refresh the page
       // window.location.reload();
      } else {
        this.toastr.error(res.message, 'Error');
      }
    });
  }

  approveForm(id: any) {
    this.approvevisible = true;
    this.approveId = id;
  }

  rejectForm(id: any) {
    this.rejectvisible = true;
    this.rejectId = id;
  }
  rejectCancel(){
    this.rejectvisible = false
  }


  reject() {
    let apiUrl = '/creditCardReqUpt';
    let data = {
      "records": {
        "id": this.rejectId,
        "status": "3"
      }
    };

    this.adminService.post(apiUrl, data).subscribe(res => {
      this.getCustomerData();
      this.rejectvisible = false
      if (res.dataStatus) {
        this.toastr.success(res.message, 'Success');
       // window.location.reload();
      } else {
        this.toastr.error(res.message, 'Error');
      }
    });
  }



  getCustomerData() {
    this.products = [];
    this.filteredProducts = [];
    this.adminService.get('/creditCardReqDet').subscribe(res => {
      console.log('customrt',res);
      
      if (res.dataStatus) {
        this.products = res.result;
        this.filteredProducts = this.products;
      }
      else {
        this.toastr.error(res.message, 'Error');
      }
    })
  }

  get shouldShowActions(): boolean {
    return this.products.some(product => product.approve_sts != '1' && product.approve_sts != '2');
  }

  onSearch() {
    let apiUrl = '/creditSearch';
    this.adminService.getCredit(apiUrl,this.searchQuery, this.limit, this.offset).subscribe({
        next: (res:any) => {
          this.products = res.result;
          this.filteredProducts = this.products;
        },
        error: (error) => {
            this.filteredProducts = [];
            if(!this.searchQuery) {
            this.getCustomerData()
            }
            console.error('Error fetching customers', error);
        },
    });
}

cusData(customer_id: any) {
  if (customer_id.length === 5) {
    this.router.navigate(['customer-detail', customer_id]);
  } else if (customer_id.length === 6) {
    this.router.navigate(['juristic-detail', customer_id]);
  } else {
    console.error('Invalid customer ID length');
  }
}

}
