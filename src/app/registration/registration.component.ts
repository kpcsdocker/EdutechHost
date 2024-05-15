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

  user_id!: string;
  first_name!: string;
  last_name!: string;
  middle_initial!: string;
  email!: string;
  grade!: string;
  school!: string;
  date_of_birth: Date = new Date;
  phone_number!: string;
  address_1!: string;
  address_2!: string;
  city!: string;
  state!: string;
  country!: string;
  created_date_time: Date = new Date;
  updated_date_time: Date = new Date;
  password!: string;
  imageFile!: File;
  code!: string;
  registrationForm!: FormGroup;
  emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

  constructor(private eduService: EdutechService, public fb:FormBuilder, private router:Router) {}

  ngOnInit(): void {
    //this.buildForm();
  }

  // buildForm() {
  //   this.registrationForm = this.fb.group({
  //     userId: [''], // Include if you want to allow user to enter their ID
  //     firstName: ['', [Validators.required]],
  //     lastName: ['', [Validators.required]],
  //     middleInitial: [''],
  //     email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
  //     dateOfBirth: ['', Validators.required],
  //     phoneNumber: ['', Validators.required],
  //     address1: [''],
  //     address2: [''],
  //     city: [''],
  //     state: [''],
  //     country: [''],
  //     createdDateTime: [''], // You can set this value on the server side
  //     updatedDateTime: [''], // You can set this value on the server side
  //     password: ['', Validators.required],
  //   });
  // }
  onSubmit(){
    const formData = new FormData();
    formData.append('id', " ");
    formData.append('user_id', this.user_id);
    formData.append('first_name', this.first_name);
    formData.append('last_name', this.last_name);
    formData.append('middle_initial', this.middle_initial);
    formData.append('email', this.email);
    formData.append('grade', this.grade);
    formData.append('school', this.school);
    formData.append('date_of_birth',  new Date(this.date_of_birth).toISOString());
    formData.append('phone_number', this.phone_number);
    formData.append('address_1', this.address_1);
    formData.append('address_2', this.address_2);
    formData.append('city', this.city);
    formData.append('state', this.state);
    formData.append('country', this.country);
    formData.append('created_date_time', new Date(this.created_date_time).toISOString()); // Convert date to string
    formData.append('updated_date_time', new Date(this.updated_date_time).toISOString()); // Convert date to string
    formData.append('password', this.password);
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
