import { Component, OnInit } from '@angular/core';
import { EdutechService } from '../../edutech.service';
import { ConfirmDialogModule } from '../../confirm-dialog/confirm-dialog.module';
import { ConfirmDialogService } from '../../confirm-dialog/confirm-dialog.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category, Course} from '../../models';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-lessons-list',
  templateUrl: './lessons-list.component.html',
  styleUrls: ['./lessons-list.component.css']
})
export class LessonsListComponent implements OnInit {

  videos: any;
  id:any;
  currentFileName: any;
  isEditClick: boolean= false;
  editVideoForm!: FormGroup;
  categories: Category[] = [];
  courses: Course[] = [];
  students: any = [];
  filteredStudents: any = [];
  selectedStudents: any[] = [];
  selectedCourse:any;

  constructor(private service: EdutechService, public fb: FormBuilder,  private confirmDialogService: ConfirmDialogService) { }

  ngOnInit(): void {
    this.getList();
    this.buildEditForm();
    this.fetchCourses();
    this.fetchCategories();
    this.fetchStudents();
  }

  buildEditForm() {
    this.editVideoForm = this.fb.group({
      course: [{ value: '', disabled: true }, Validators.required],
      category: [{ value: '', disabled: true }, Validators.required],
      student: [{ value: [], disabled: true }, Validators.required],
      description: ['', Validators.required],
      video: ['', Validators.required]
    });
  }

  fetchCourses() {
    this.service.getCourses().subscribe(courses => {
      this.courses = courses;
      this.editVideoForm.get('course')?.enable();
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
        this.editVideoForm.get('student')?.enable();
      },
      error => console.error('Error fetching students', error)
    );
  }

  getList(){
    this.service.getVideosList().subscribe((data:any)=> {this.videos=data});
  }

  edit(id: any) {
    this.id=id;
    this.isEditClick = true;
    this.service.getVideosById(id).subscribe((video: any) => {
      const selectedCourse = this.courses.find(course => course.course_name === video.course_name);
      const selectedCategory = this.categories.find(category => category.category_name === video.category_name);
      const studentNames = video.student_name;
      const selectedStudents = this.students.filter((student: any) => studentNames.includes(student.first_name));
      this.selectedStudents = selectedStudents;
  
      this.editVideoForm.patchValue({
        course: selectedCourse,
        category: selectedCategory,
        student: selectedStudents,
        description: video.description,
        video: video.fileName
      });
      // Check checkboxes for selected students
      this.filteredStudents.forEach((student:any) => {
        student.checked = this.isStudentSelected(student);
      });
      this.currentFileName = video.fileName;
      console.log(this.editVideoForm.value);
    });
  } 

  onEditCourseChange() {
    const selectedCourseId = this.editVideoForm.get('course')?.value;
    this.editVideoForm.get('category')?.reset();
    this.categories = [];
    if (selectedCourseId) {
      this.selectedCourse = this.courses.find(course => course.course_id === selectedCourseId.course_id);
      if (this.selectedCourse) {
        this.categories = this.selectedCourse.categories;
        this.editVideoForm.get('category')?.enable();
      }
    } else {
      this.selectedCourse = null;
      this.categories = [];
      this.editVideoForm.get('category')?.disable();
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

  isStudentSelected(studentId: any) {
    return this.selectedStudents.some(student => student.user_id === studentId);
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    this.editVideoForm.patchValue({
      video: file
    });
  }

  onEditSubmit() {
    const formData = new FormData();
    formData.append('course_id', this.editVideoForm.get('course')?.value.course_id);
    formData.append('course_name', this.editVideoForm.get('course')?.value.course_name);
    formData.append('category_id', this.editVideoForm.get('category')?.value.category_id);
    formData.append('category_name', this.editVideoForm.get('category')?.value.category_name);
    // Append student_id as array of strings
    this.selectedStudents.forEach(student => {
      formData.append('student_id', student.user_id);
  });

  // Append student_name as array of strings
  this.selectedStudents.forEach(student => {
      formData.append('student_name', student.first_name);
  });
    formData.append('description', this.editVideoForm.get('description')?.value);
    formData.append('video', this.editVideoForm.get('video')?.value);
    console.log("success");
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });
    this.service.updateVideo(formData, this.id).subscribe(response => {
      console.log('Video updated successfully', response);
      this.isEditClick = false;
      this.service.getVideosList().subscribe((data: any) => { this.videos = data; });
    });
  }

  cancelEdit() {
    this.isEditClick = false;
    this.editVideoForm.reset();
    this.selectedStudents = [];
    this.filteredStudents = this.students;
    this.fetchCategories();
    this.fetchCourses();
  }

  deleteVideo(id:any){
    this.confirmDialogService.confirmThis('Are you sure to delete ?', () =>  {
      this.service.deleteVideo(id).subscribe(res=>{
        console.log("deleted");
        this.getList();
      });
    }, () => {
      console.log("Cancel");
    });
  }
}
