import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuristicDetailsComponent } from './juristic-details.component';

describe('JuristicDetailsComponent', () => {
  let component: JuristicDetailsComponent;
  let fixture: ComponentFixture<JuristicDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JuristicDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JuristicDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
