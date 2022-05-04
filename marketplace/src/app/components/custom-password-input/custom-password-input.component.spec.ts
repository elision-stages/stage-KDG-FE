import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomPasswordInputComponent } from './custom-password-input.component';

describe('PasswordInputComponent', () => {
  let component: CustomPasswordInputComponent;
  let fixture: ComponentFixture<CustomPasswordInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomPasswordInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomPasswordInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
