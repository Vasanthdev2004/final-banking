import { Component, Input } from '@angular/core';
import {Location} from '@angular/common';
import { AdminService } from '../../services/admin.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrl: './customer-details.component.scss'
})
export class CustomerDetailsComponent {

  constructor( private _location: Location, private adminService:AdminService,private route: ActivatedRoute){}

  childData: any

  ngOnInit(){
    this.adminService.currentData.subscribe((data) => {
      this.childData = data[0]
      console.log(this.childData,'datattatattttatattatattat');
    });

    const id = this.route.snapshot.paramMap.get('id');  // Retrieve ID from route
    if (id) {
      this.getData(id);  // Pass ID to the function
    }
    
  }


  back(){
    this._location.back();
  }

  getData(id: string) {
    this.adminService.getCustomerData('/customerDetById', id).subscribe((res) => {
      console.log('customer', res);

      if (res.dataStatus) {
        let customerData = res.result;
        this.adminService.changeData(customerData);
      } else {
        // Handle error
        // this.toastr.error(res.message, 'Error');
      }
    }, (err) => {
      console.error('Error', err);
    });
  }

}
