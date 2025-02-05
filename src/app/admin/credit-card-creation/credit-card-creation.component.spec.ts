import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditCardCreationComponent } from './credit-card-creation.component';

describe('CreditCardCreationComponent', () => {
  let component: CreditCardCreationComponent;
  let fixture: ComponentFixture<CreditCardCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreditCardCreationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreditCardCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
