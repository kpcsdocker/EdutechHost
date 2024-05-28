import { Component, OnInit } from '@angular/core';
import { EdutechService } from '../edutech.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-student-update',
  templateUrl: './student-update.component.html',
  styleUrls: ['./student-update.component.css']
})
export class StudentUpdateComponent implements OnInit {
  students: any;
  studentById: any;
  password: any;
  social_picture: any;
  email: any;
  name: any;
  city: any;
  state: any;
  profile: any;
  editForm!: FormGroup;

  constructor(private eduService: EdutechService, public fb: FormBuilder, private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.buildForm();
    this.loadStudentData();
  }

  buildForm() {
    this.editForm = this.fb.group({
      user_id: [''],
      first_name: [{value: '', disabled: true}, [Validators.required]],
      last_name: ['', [Validators.required]],
      middle_initial: [''],
      email: [{value: '', disabled: true}, [Validators.required, Validators.email]],
      date_of_birth: ['', Validators.required],
      phone_number: ['', Validators.required],
      address_1: [''],
      address_2: [''],
      city: [''],
      state: [''],
      school: [''],
      grade: [''],
      country: [''],
      created_date_time: [''],
      updated_date_time: [''],
      password: ['', Validators.required],
      profile: [''],
      social_picture: ['']
    });
  }

  loadStudentData(): void {
    this.eduService.getSocialLogin().subscribe(data => {
      this.students = data;
      this.password = this.eduService.getPassword();
      this.email = this.eduService.getEmail();

      const student = this.students.find((student: any) => student.email === this.email);
      if (student) {
        this.name = student.first_name;
        this.eduService.getSocialLoginById(student.user_id).subscribe(data => {
          this.studentById = data;
          if (this.studentById) {
            this.editForm.patchValue(this.studentById);
          }
        });
      }
    });
  }

  editStudentFormSubmit(): void {
        this.eduService.setEmail(this.email);
        this.editForm.value.first_name = this.name;
        this.editForm.value.email= this.email;
        this.eduService.updateSocialLogin(this.editForm.value.user_id, this.editForm.value).subscribe(res => {
        this.router.navigate(['/stu-dashboard'], { queryParams: { action: 'socialLogin' } });
        console.log("updated");});
  }
}
