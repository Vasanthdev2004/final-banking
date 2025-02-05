import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuristicPageComponent } from './juristic-page.component';

describe('JuristicPageComponent', () => {
  let component: JuristicPageComponent;
  let fixture: ComponentFixture<JuristicPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JuristicPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JuristicPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
