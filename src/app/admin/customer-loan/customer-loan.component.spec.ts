import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerLoanComponent } from './customer-loan.component';

describe('CustomerLoanComponent', () => {
  let component: CustomerLoanComponent;
  let fixture: ComponentFixture<CustomerLoanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerLoanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
