import { Component, OnInit } from '@angular/core';
import { EdutechService } from '../../edutech.service';
import { ConfirmDialogModule } from '../../confirm-dialog/confirm-dialog.module';
import { ConfirmDialogService } from '../../confirm-dialog/confirm-dialog.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category, Subcategory, Course, CourseSubcategory } from '../../models';
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
  subcategories: Subcategory[] = [];
  courses: Course[] = [];
  students: any = []; // Initialize as an empty array
  filteredStudents: any = []; // Initialize as an empty array
  courseSubcategories: CourseSubcategory[] = [];
  selectedStudents: any[] = [];

  constructor(private service: EdutechService, public fb: FormBuilder,  private confirmDialogService: ConfirmDialogService) { }

  ngOnInit(): void {
    this.getList();
    this.buildEditForm();
    this.fetchCourses();
    this.fetchCategories();
    this.fetchSubcategories();
    this.fetchCourseSubcategories();
    this.fetchStudents();
  }

  buildEditForm() {
    this.editVideoForm = this.fb.group({
      course: [{ value: '', disabled: true }, Validators.required],
      category: [{ value: '', disabled: true }, Validators.required],
      subcategory: [{ value: '', disabled: true }, Validators.required],
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

  fetchSubcategories() {
    this.service.getSubcategories().subscribe(subcategories => {
      this.subcategories = subcategories;
    });
  }

  fetchCourseSubcategories() {
    this.service.getCourseSubcategories().subscribe(courseSubcategories => {
      this.courseSubcategories = courseSubcategories;
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
      const selectedCourse = this.courses.find(course => course.courseName === video.course_name);
      const selectedCategory = this.categories.find(category => category.categoryName === video.category_name);
      const selectedSubcategory = this.subcategories.find(subcategory => subcategory.subcategoryName === video.subcategory_name);
  
      let studentNames: string[];
      try {
        studentNames = JSON.parse(video.student_name);
        if (!Array.isArray(studentNames)) {
          studentNames = [studentNames];
        }
      } catch (e) {
        studentNames = [video.student_name];
      }
  
      console.log('studentNames:', studentNames);
      console.log('this.students:', this.students);
  
      this.selectedStudents = this.students.filter((student: any) => studentNames.includes(student.first_name));
  
      console.log('selectedStudents:', this.selectedStudents);
  
      this.editVideoForm.patchValue({
        course: selectedCourse,
        category: selectedCategory,
        subcategory: selectedSubcategory,
        student: this.selectedStudents.map(s => s.first_name).join(', '),
        description: video.description,
        video: video.fileName
      });
      this.currentFileName = video.fileName;
      console.log(this.editVideoForm.value);
    });
  } 

  onEditCourseChange() {
    const selectedCourse = this.editVideoForm.get('course')?.value;
    this.editVideoForm.get('category')?.reset();
    this.editVideoForm.get('subcategory')?.reset();
    this.categories = [];
    this.subcategories = [];

    if (selectedCourse) {
      this.service.getCategories().pipe(
        switchMap(categories => {
          this.categories = categories.filter(category =>
            this.courseSubcategories.some(cs =>
              cs.course.courseId === selectedCourse.courseId && cs.subcategory.category.categoryId === category.categoryId
            )
          );
          this.editVideoForm.get('category')?.enable();
          return this.service.getSubcategories();
        }),
        switchMap(subcategories => {
          this.subcategories = this.courseSubcategories
            .filter(cs => cs.course.courseId === selectedCourse.courseId)
            .map(cs => cs.subcategory);
          return of(subcategories);
        })
      ).subscribe();
    } else {
      this.editVideoForm.get('category')?.disable();
      this.editVideoForm.get('subcategory')?.disable();
    }
  }

  onEditCategoryChange() {
    const selectedCourse = this.editVideoForm.get('course')?.value;
    const selectedCategory = this.editVideoForm.get('category')?.value;
    this.editVideoForm.get('subcategory')?.reset();
    this.subcategories = [];

    if (selectedCourse && selectedCategory) {
      this.subcategories = this.courseSubcategories.filter(cs =>
        cs.course.courseId === selectedCourse.courseId &&
        cs.subcategory.category.categoryId === selectedCategory.categoryId
      ).map(cs => cs.subcategory);
      this.editVideoForm.get('subcategory')?.enable();
    } else {
      this.editVideoForm.get('subcategory')?.disable();
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
    formData.append('course_id', this.editVideoForm.get('course')?.value.courseId);
    formData.append('course_name', this.editVideoForm.get('course')?.value.courseName);
    formData.append('category_id', this.editVideoForm.get('category')?.value.categoryId);
    formData.append('category_name', this.editVideoForm.get('category')?.value.categoryName);
    formData.append('subcategory_id', this.editVideoForm.get('subcategory')?.value.subcategoryId);
    formData.append('subcategory_name', this.editVideoForm.get('subcategory')?.value.subcategoryName);
    formData.append('student_id', JSON.stringify(this.selectedStudents.map(s => s.user_id)));
    formData.append('student_name', JSON.stringify(this.selectedStudents.map(s => s.first_name)));
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
