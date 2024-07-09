import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { EdutechService } from '../../edutech.service';
import { Router } from '@angular/router';
import { ConfirmDialogModule } from '../../confirm-dialog/confirm-dialog.module';
import { ConfirmDialogService } from '../../confirm-dialog/confirm-dialog.service';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Category, Course} from '../../models';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

declare var MathJax: any;

@Component({
  selector: 'app-questions-list',
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.css']
})
export class QuestionsListComponent implements OnInit, AfterViewChecked {

  editForm!: FormGroup;
  questions: any;
  private mathJaxObject;
  isEditQuestionSelected: boolean = false;
  questionById: any;
  isMCQSelected: boolean = false;
  alert!: string;
  categories: Category[] = [];
  courses: Course[] = [];
  students: any = [];
  filteredStudents: any = []; 
  selectedStudents: any[] = [];
  selectedCourse: any;

  constructor(public fb: FormBuilder,public service: EdutechService, private router: Router, private confirmDialogService: ConfirmDialogService) { 
    this.mathJaxObject = MathJax;
  }

  ngOnInit(): void {
    this.getQuestions();
    this.buildForm();
    this.fetchCourses();
    this.fetchCategories();
    this.fetchStudents();
  }

  buildForm() {
    this.editForm = this.fb.group({
      id: [''],
      q_ans: ['', [Validators.required]],
      q_type: ['', [Validators.required]],
      assignment: ['', [Validators.required]],
      q: ['', [Validators.required]],
      diff: [''],
      options: this.fb.array([]),
      course: [{ value: '', disabled: true }, Validators.required],
      category: [{ value: '', disabled: true }, Validators.required],
      subcategory: [{ value: '', disabled: true }, Validators.required],
      student: [{ value: [], disabled: true }, Validators.required],
    });
  }

  fetchCourses() {
    this.service.getCourses().subscribe(courses => {
      this.courses = courses;
      this.editForm.get('course')?.enable();
    });
  }

  fetchCategories() {
    this.service.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  fetchStudents() {
    this.service.getStudents().subscribe(
      data => {
        this.students = data;
        this.filteredStudents = data;
        this.editForm.get('student')?.enable();
      },
      error => console.error('Error fetching students', error)
    );
  }

  getQuestions(){
    this.service.getQuestions().subscribe(data=>{
      this.questions = data; 
      this.renderMath();
    });
  }

  ngAfterViewChecked() {
    this.renderMath();
  }

  renderMath() {
    this.mathJaxObject.typeset();
  }

  questionUpload() {
    this.router.navigate(['/upload']);
  }

  deleteQuestion(id:any){
    this.confirmDialogService.confirmThis('Are you sure to delete ?', () =>  {
      this.service.deleteQuestion(id).subscribe(res=>{
        console.log("deleted");
        this.getQuestions();
      });
    }, () => {
      console.log("Cancel");
    });
  }

  editQuestion(id: any) {
    this.isEditQuestionSelected = true;
    this.service.getQuestionById(id).subscribe((res: any) => {
      console.log("getting questions",res);
      console.log("categories",this.categories);
      this.questionById = res;
      const selectedCourse = this.courses.find(course => course.course_name === res.course_name);
      const selectedCategory = this.categories.find(category => category.category_name === res.category_name);
      const studentNames = res.student_name;
      const selectedStudents = this.students.filter((student: any) => studentNames.includes(student.first_name));
      this.selectedStudents = selectedStudents;
       // Enable the form controls before patching
       this.editForm.get('category')?.enable();
       this.editForm.get('subcategory')?.enable();
  
      // Patch form values
      this.editForm.patchValue({
        diff: res.diff,
        q: res.q,
        q_type: res.q_type,
        assignment: res.assignment,
        q_ans: res.q_ans,
        course: selectedCourse,
        category: selectedCategory,
        student: selectedStudents,
        id: this.questionById.id
      });
      // Check checkboxes for selected students
      this.filteredStudents.forEach((student:any) => {
        student.checked = this.isStudentSelected(student);
      });
  
      if (this.questionById.q_type === 'mcq' && this.questionById.id === id) {
        this.isMCQSelected = true;
        this.populateOptions(this.questionById.options);
      } else {
        this.isMCQSelected = false;
      }
    });
  }

  isStudentSelected(studentId: any) {
    return this.selectedStudents.some(student => student.user_id === studentId);
  }

  
  onEditCourseChange() {
    const selectedCourseId = this.editForm.get('course')?.value;
    this.editForm.get('category')?.reset();
    this.categories = [];
    if (selectedCourseId) {
      this.selectedCourse = this.courses.find(course => course.course_id === selectedCourseId.course_id);
      if (this.selectedCourse) {
        this.categories = this.selectedCourse.categories;
        this.editForm.get('category')?.enable();
      }
    } else {
      this.selectedCourse = null;
      this.categories = [];
      this.editForm.get('category')?.disable();
    }
  }
  
  onSearch(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    this.filteredStudents = this.students.filter((student: any) =>
      student.first_name.toLowerCase().includes(searchTerm)
    );
  }

  onStudentSelect(event: any, student: any) {
    if (event.target.checked) {
      this.selectedStudents.push(student);
    } else {
      this.selectedStudents = this.selectedStudents.filter(s => s.user_id !== student.user_id);
    }
  }

  populateOptions(options: any[]) {
    const formArray = this.editForm.get('options') as FormArray;
    options.forEach(option => {
      formArray.push(this.fb.group({
        o_name: option.o_name,
        o_text: option.o_text
      }));
    });
  }

  onQTypeChange(event: any) {
    this.isMCQSelected = event.target.value === 'mcq';
    const options = this.editForm.get('options') as FormArray;
    if (this.isMCQSelected && options.length === 0) {
      this.addOptions();
    }
  }

  addOptions() {
    const options = this.editForm.get('options') as FormArray;
    for (let i = 0; i < 4; i++) {
      options.push(this.fb.group({
        o_name: '',
        o_text: ''
      }));
    }
  }

  getOptionName(index: number, event: FocusEvent) {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value;
    const options = this.editForm.get('options') as FormArray;
    const optionGroup = options.at(index) as FormGroup;

    const optionNames = ['A', 'B', 'C', 'D'];
    optionGroup.get('o_name')?.setValue(optionNames[index] || '');
  }

  onSubmit() {
    const formValue = this.editForm.value;
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
    this.service.updateQuestion(transformedValue.id,transformedValue).subscribe(
      () => {
        this.getQuestions();
        this.backToListPage();
      },
      error => {
        this.alert = "Error updating the question.";
      }
    );
  }

  get options(): FormArray {
    return this.editForm.get('options') as FormArray;
  }

  alertMessage() {
    this.alert = "Please enter all mandatory fields";
    setTimeout(() => {
      this.alert = '';
    }, 5000);
  }

  backToListPage(){
    this.isEditQuestionSelected= false;
    const options = this.editForm.get('options') as FormArray;
    while (options.length !== 0) {
      options.removeAt(0);
    }
    this.editForm.reset();
    this.selectedStudents = [];
    this.filteredStudents = this.students;
    this.fetchCategories();
    this.fetchCourses();
  }
}
