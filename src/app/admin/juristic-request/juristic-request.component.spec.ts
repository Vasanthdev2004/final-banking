import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuristicRequestComponent } from './juristic-request.component';

describe('JuristicRequestComponent', () => {
  let component: JuristicRequestComponent;
  let fixture: ComponentFixture<JuristicRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JuristicRequestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JuristicRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
