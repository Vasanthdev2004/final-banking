import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuristicCreditCardComponent } from './juristic-credit-card.component';

describe('JuristicCreditCardComponent', () => {
  let component: JuristicCreditCardComponent;
  let fixture: ComponentFixture<JuristicCreditCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JuristicCreditCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JuristicCreditCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
