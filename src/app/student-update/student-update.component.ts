import { Component, OnInit } from '@angular/core';
import { EdutechService } from '../edutech.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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

  constructor(private eduService: EdutechService, public fb: FormBuilder) { }

  ngOnInit(): void {
    this.buildForm();
    this.loadStudentData();
  }

  buildForm() {
    this.editForm = this.fb.group({
      user_id: [''],
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      middle_initial: [''],
      email: ['', [Validators.required, Validators.email]],
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
        console.log(student.user_id);
        this.eduService.getSocialLoginById(student.user_id).subscribe(data => {
          this.studentById = data;
          console.log(this.studentById);
          if (this.studentById) {
            this.editForm.patchValue(this.studentById);
          }
        });
      }
    });
  }

  editStudentFormSubmit(): void {
      console.log(this.editForm.value);
      this.eduService.updateSocialLogin(this.editForm.value.user_id, this.editForm.value).subscribe(res => {
        console.log("updated");});
  }
}
