import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder,Validators} from '@angular/forms';
import { EdutechService } from '../edutech.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  students:any;
  loginForm!: FormGroup;
  constructor(public fb:FormBuilder, private eduService: EdutechService, private router:Router) { }

  ngOnInit(): void {
  	this.buildForm();
  	this.eduService.getStudents().subscribe(data => {this.students = data; console.log(data);
    });
  }

  buildForm() {
    this.loginForm = this.fb.group({
      email: ['',Validators.required],
      name:['',Validators.required]
    });
  }

  onSubmit(){
    for(var i=0; i<this.students.length; i++){
      if(this.loginForm.get('email')?.value == this.students[i].email && this.loginForm.get('name')?.value == this.students[i].name){
          this.eduService.setUserName(this.loginForm.get('name')?.value);
          this.eduService.setEmail(this.loginForm.get('email')?.value);
          this.router.navigate(['/stu-dashboard']);
      }
      else{
      }
  }}
}