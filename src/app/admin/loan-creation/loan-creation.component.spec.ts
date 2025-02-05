import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanCreationComponent } from './loan-creation.component';

describe('LoanCreationComponent', () => {
  let component: LoanCreationComponent;
  let fixture: ComponentFixture<LoanCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoanCreationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoanCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
