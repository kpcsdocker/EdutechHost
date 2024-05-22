import { Component, OnInit } from '@angular/core';
import { EdutechService } from '../edutech.service';
import { FormGroup, FormControl, FormBuilder,Validators} from '@angular/forms';

@Component({
  selector: 'app-student-update',
  templateUrl: './student-update.component.html',
  styleUrls: ['./student-update.component.css']
})
export class StudentUpdateComponent implements OnInit {

  students: any;
  studentById:any;
  password: any;
  social_picture: any;
  email: any;
  name: any;
  city: any;
  state: any;
  profile: any;
  editForm!: FormGroup;
  constructor(private eduService: EdutechService,public fb:FormBuilder) { }

  ngOnInit(): void {
    this.eduService.getSocialLogin().subscribe(data => {this.students = data;
      this.password = this.eduService.getPassword();
      this.email = this.eduService.getEmail();
      for(var i=0; i<this.students.length; i++){
        if(this.students[i].email == this.email){
          console.log(this.students[i].user_id);
          this.eduService.getSocialLoginById(this.students[i].user_id).subscribe(data => {this.studentById = data; console.log(data);})
        }}
    });
  }

  buildForm() {
    this.editForm = this.fb.group({
      user_id: [''], // Include if you want to allow user to enter their ID
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      middle_initial: [''],
      email: ['', [Validators.required]],
      date_of_birth: ['', Validators.required],
      phone_number: ['', Validators.required],
      address_1: [''],
      address_2: [''],
      city: [''],
      state: [''],
      country: [''],
      created_date_time: [''], // You can set this value on the server side
      updated_date_time: [''], // You can set this value on the server side
      password: ['', Validators.required],
      social_picture: ['']
    });
  }

  editStudentFormSubmit(id:any){
  	this.eduService.updateSocialLogin(id,this.editForm.value).subscribe(res=>{
  		console.log("updated");
  	});
  }
}
