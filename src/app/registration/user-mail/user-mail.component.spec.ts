import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMailComponent } from './user-mail.component';

describe('UserMailComponent', () => {
  let component: UserMailComponent;
  let fixture: ComponentFixture<UserMailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserMailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
