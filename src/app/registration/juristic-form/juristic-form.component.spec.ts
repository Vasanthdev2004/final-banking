import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuristicFormComponent } from './juristic-form.component';

describe('JuristicFormComponent', () => {
  let component: JuristicFormComponent;
  let fixture: ComponentFixture<JuristicFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JuristicFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JuristicFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
