import { Component, OnInit } from '@angular/core';
import { EdutechService } from '../edutech.service';
import { FormGroup, FormControl, FormBuilder,Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  name!: string;
  email!: string;
  grade!: string;
  school!: string;
  imageFile!: File;
  code!: string;
  registrationForm!: FormGroup;
  emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

  constructor(private eduService: EdutechService, public fb:FormBuilder, private router:Router) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.registrationForm = this.fb.group({
      userId: [''], // Include if you want to allow user to enter their ID
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      middleInitial: [''],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      dateOfBirth: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      address1: [''],
      address2: [''],
      city: [''],
      state: [''],
      country: [''],
      createdDateTime: [''], // You can set this value on the server side
      updatedDateTime: [''], // You can set this value on the server side
      password: ['', Validators.required],
    });
  }
  onSubmit(){
    const formData = new FormData();
    formData.append('id', " ")
    formData.append('name', this.name);
    formData.append('email', this.email);
    formData.append('grade', this.grade);
    formData.append('school', this.school);
    formData.append('profile', this.imageFile);
    this.eduService.imageSubmit(formData).subscribe(res=>{this.eduService.sendMail(this.email).subscribe();console.log(res);});
 }

 register(){
  console.log("calling");
  this.eduService.postUser(this.registrationForm.value).subscribe(res=>
    {
      this.router.navigate(['/login']);
    },
    error=>{console.log("error")});
 }
  
  onFileSelected(event:any) {
    this.imageFile = event.target.files[0];
  }

  verifyCode() {
    this.eduService.verifyCode(this.email, this.code).subscribe(response => {
      console.log(response); // Handle response from backend
    });
}
}
