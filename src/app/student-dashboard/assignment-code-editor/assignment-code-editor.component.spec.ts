import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentCodeEditorComponent } from './assignment-code-editor.component';

describe('AssignmentCodeEditorComponent', () => {
  let component: AssignmentCodeEditorComponent;
  let fixture: ComponentFixture<AssignmentCodeEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignmentCodeEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignmentCodeEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
