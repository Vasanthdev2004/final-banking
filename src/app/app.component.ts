import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'test';


  constructor(private router: Router) {}

  ngOnInit() {
    // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }
}


@Component({
  selector: 'delete-confirmation-dialog',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Confirm Delete</h4>
      <button type="button" class="btn-close" aria-label="Close" (click)="modal.dismiss('cancel')"></button>
    </div>
    <div class="modal-body">
      <p>Are you sure you want to delete this item?</p>
    </div>
    <div class="modal-footer">
    <button type="button" class="btn btn-danger" (click)="confirmDelete()">Yes</button>
      <button type="button" class="btn btn-secondary" (click)="modal.dismiss('cancel')">No</button>
    </div>
  `
})


export class DeleteConfirmationDialog {
  @Input() id: any;

  constructor(public modal: NgbActiveModal, private toastr: ToastrService) {}

  confirmDelete() {
    this.modal.close('yes');
    this.toastr.success('Item deleted successfully', 'Success');
  }
}
