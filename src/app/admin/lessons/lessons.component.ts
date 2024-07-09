import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EdutechService } from '../../edutech.service';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { Category, Course} from '../../models';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.css']
})
export class LessonsComponent implements OnInit {
  videoForm!: FormGroup;
  categories: Category[] = [];
  courses: Course[] = [];
  students: any = []; 
  filteredStudents: any = []; 
  selectedStudents: any[] = [];
  errorMessage: any;
  selectedCourse: any;

  constructor(private service: EdutechService, public fb: FormBuilder,private router: Router) {}

  ngOnInit(): void {
    this.buildForm();
    this.fetchStudents();
    this.fetchCourses();
    this.fetchCategories();
  }

  buildForm() {
    this.videoForm = this.fb.group({
      course: [{ value: '', disabled: true }, Validators.required],
      category: [{ value: '', disabled: true }, Validators.required],
      subcategory: [{ value: '', disabled: true }, Validators.required],
      student: [{ value: [], disabled: true }, Validators.required],
      description: ['', Validators.required],
      video: ['', Validators.required]
    });
  }

  fetchStudents() {
    this.service.getStudents().subscribe(
      data => {
        this.students = data;
        this.filteredStudents = data;
        this.videoForm.get('student')?.enable();
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
      this.videoForm.get('course')?.enable();
    });
  }

  onCourseChange() {
    const selectedCourseId = this.videoForm.get('course')?.value;
    if (selectedCourseId) {
      this.selectedCourse = this.courses.find(course => course.course_id === selectedCourseId.course_id);
      if (this.selectedCourse) {
        this.categories = this.selectedCourse.categories;
        this.videoForm.get('category')?.enable();
      }
    } else {
      this.selectedCourse = null;
      this.categories = [];
      this.videoForm.get('category')?.disable();
    }
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    this.videoForm.patchValue({ video: file });
  }

  onSubmit() {
    if (this.videoForm.valid) {
        const formData = new FormData();
        formData.append('course_id', this.videoForm.get('course')?.value.course_id);
        formData.append('course_name', this.videoForm.get('course')?.value.course_name);
        formData.append('category_id', this.videoForm.get('category')?.value.category_id);
        formData.append('category_name', this.videoForm.get('category')?.value.category_name);
        // Append student_id as array of strings
        this.selectedStudents.forEach(student => {
            formData.append('student_id', student.user_id);
        });

        // Append student_name as array of strings
        this.selectedStudents.forEach(student => {
            formData.append('student_name', student.first_name);
        });

        formData.append('description', this.videoForm.get('description')?.value);
        formData.append('file', this.videoForm.get('video')?.value);

        this.service.videoUpload(formData).subscribe(
            response => {
                console.log('Upload successful', response);
                this.router.navigate(['/lessonsList']);
            },
            error => {
                if (error) {
                    // Handle file already exists error
                    this.errorMessage = 'A file with the same name already exists. Please rename the file and try again.';
                } else {
                    console.error('Upload failed', error);
                }
            }
        );

        console.log('Form submitted', this.videoForm.value);
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

    this.videoForm.patchValue({ student: this.selectedStudents });
  }

  isStudentSelected(studentId: number): boolean {
    return this.selectedStudents.some(student => student.user_id === studentId);
  }

  questionUpload() {
    this.router.navigate(['/upload']);
  }
}
