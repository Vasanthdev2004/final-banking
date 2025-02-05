import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuristicManagementComponent } from './juristic-management.component';

describe('JuristicManagementComponent', () => {
  let component: JuristicManagementComponent;
  let fixture: ComponentFixture<JuristicManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JuristicManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JuristicManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
