import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { EdutechService } from '../../edutech.service';
import { Router } from '@angular/router';
import { switchMap, map } from 'rxjs/operators'; // Import map from 'rxjs/operators'
import { of } from 'rxjs';
import { Category, Course } from '../../models'; // Make sure the models are correctly imported

@Component({
  selector: 'app-question-upload',
  templateUrl: './question-upload.component.html',
  styleUrls: ['./question-upload.component.css']
})
export class QuestionUploadComponent implements OnInit {

  questionForm!: FormGroup;
  isMCQSelected: boolean = false;
  alert!: string;
  categories: Category[] = [];
  courses: Course[] = [];
  students: any = [];
  filteredStudents: any = [];
  selectedStudents: any[] = [];
  errorMessage: any;
  selectedCourse: any;

  constructor(public fb: FormBuilder, public service: EdutechService, private router: Router) {}

  ngOnInit(): void {
    this.buildForm();
    this.fetchStudents();
    this.fetchCourses();
    this.fetchCategories();
    this.selectOptions();
  }

  buildForm() {
    this.questionForm = this.fb.group({
      id: [''],
      q_ans: ['', [Validators.required]],
      q_type: ['', [Validators.required]],
      q: ['', [Validators.required]],
      diff: [''],
      options: this.fb.array([]),
      course: [{ value: '', disabled: true }, Validators.required],
      category: [{ value: '', disabled: true }, Validators.required],
      subcategory: [{ value: '', disabled: true }, Validators.required],
      student: [{ value: [], disabled: true }, Validators.required],
      assignment: [''], 
    });
  }

  fetchStudents() {
    this.service.getStudents().subscribe(
      data => {
        this.students = data;
        this.filteredStudents = data;
        this.questionForm.get('student')?.enable();
      },
      error => console.error('Error fetching students', error)
    );
  }

  fetchCategories() {
    this.service.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  fetchCourses() {
    this.service.getCourses().subscribe(courses => {
      this.courses = courses;
      this.questionForm.get('course')?.enable();
    });
  }

  onCourseChange() {
    const selectedCourseId = this.questionForm.get('course')?.value;
    if (selectedCourseId) {
      this.selectedCourse = this.courses.find(course => course.course_id === selectedCourseId.course_id);
      if (this.selectedCourse) {
        this.categories = this.selectedCourse.categories;
        this.questionForm.get('category')?.enable();
      }
    } else {
      this.selectedCourse = null;
      this.categories = [];
      this.questionForm.get('category')?.disable();
    }
  }

  onSearch(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    this.filteredStudents = this.students.filter((student: any) =>
      student.first_name.toLowerCase().includes(searchTerm)
    );
  }

  onStudentSelect(event: any, student: any) {
    const isChecked = event.target.checked;

    if (isChecked) {
      this.selectedStudents.push(student);
    } else {
      this.selectedStudents = this.selectedStudents.filter(s => s.user_id !== student.user_id);
    }
    console.log(this.selectedStudents);
    this.questionForm.patchValue({ student: this.selectedStudents });
  }

  isStudentSelected(studentId: number): boolean {
    return this.selectedStudents.some(student => student.user_id === studentId);
  }

  selectOptions() {
    const opt = this.questionForm.get('options') as FormArray;
    for (let i = 0; i < 4; i++) {
      opt.push(this.fb.group({
        o_name: '',
        o_text: ''
      }));
    }
  }

  onQTypeChange(event: any) {
    if (event.target.value == "mcq") {
      this.isMCQSelected = true;
    } else if (event.target.value == "dque") {
      this.isMCQSelected = false;
    }
  }

  getOptionName(index: number, event: FocusEvent) {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value;
    const options = this.questionForm.get('options') as FormArray;
    const optionGroup = options.at(index) as FormGroup;

    switch (index) {
      case 0:
        optionGroup.get('o_name')?.setValue('A');
        break;
      case 1:
        optionGroup.get('o_name')?.setValue('B');
        break;
      case 2:
        optionGroup.get('o_name')?.setValue('C');
        break;
      case 3:
        optionGroup.get('o_name')?.setValue('D');
        break;
      default:
        break;
    }
  }

  onSubmit() {
    const formValue = this.questionForm.value;
    // Extract the necessary fields from nested objects and arrays
    const transformedValue = {
      id: formValue.id,
      q_ans: formValue.q_ans,
      q_type: formValue.q_type,
      assignment: formValue.assignment,
      q: formValue.q,
      diff: formValue.diff,
      options: formValue.options,
      course_id: formValue.course.course_id,
      category_id: formValue.category.category_id,
      course_name: formValue.course.course_name,
      category_name: formValue.category.category_name,
      student_id: formValue.student.map((stu: any) => stu.user_id),
      student_name: formValue.student.map((stu: any) => stu.first_name)
    };
  
    console.log("question form submitting", transformedValue);
  
    this.service.postQuestions(transformedValue).subscribe(
      data => {
        console.log(data);
        this.router.navigate(['/list']);
      }
    );
  }

  get options(): FormArray {
    return this.questionForm.get('options') as FormArray;
  }

  alertMessage() {
    setTimeout(() => {
      this.alert = "please enter all mandatory fields";
    }, 5000);
  }

  questionsList() {
    this.router.navigate(['/list']);
  }
}
