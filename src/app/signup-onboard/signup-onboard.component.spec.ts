import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupOnboardComponent } from './signup-onboard.component';

describe('SignupOnboardComponent', () => {
  let component: SignupOnboardComponent;
  let fixture: ComponentFixture<SignupOnboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupOnboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupOnboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
