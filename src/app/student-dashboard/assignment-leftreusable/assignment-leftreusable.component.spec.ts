import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentLeftreusableComponent } from './assignment-leftreusable.component';

describe('AssignmentLeftreusableComponent', () => {
  let component: AssignmentLeftreusableComponent;
  let fixture: ComponentFixture<AssignmentLeftreusableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignmentLeftreusableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignmentLeftreusableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
