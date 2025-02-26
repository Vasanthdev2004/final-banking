import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditCardDetailsComponent } from './credit-card-details.component';

describe('CreditCardDetailsComponent', () => {
  let component: CreditCardDetailsComponent;
  let fixture: ComponentFixture<CreditCardDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreditCardDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreditCardDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
