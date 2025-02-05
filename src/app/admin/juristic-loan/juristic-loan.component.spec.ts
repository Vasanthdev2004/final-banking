import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuristicLoanComponent } from './juristic-loan.component';

describe('JuristicLoanComponent', () => {
  let component: JuristicLoanComponent;
  let fixture: ComponentFixture<JuristicLoanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JuristicLoanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JuristicLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
