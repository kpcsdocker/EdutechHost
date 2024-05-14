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
  users:any;
  loginForm!: FormGroup;
  constructor(public fb:FormBuilder, private eduService: EdutechService, private router:Router) { }

  ngOnInit(): void {
  	this.buildForm();
  	this.eduService.getStudents().subscribe(data => {this.students = data;});
    this.eduService.getUsers().subscribe(data => {this.users = data; console.log(data);
    });
  }

  buildForm() {
    this.loginForm = this.fb.group({
      email: ['',Validators.required],
      password:['',Validators.required]
    });
  }

  onSubmit(){
    for(var i=0; i<this.users.length; i++){
      if(this.loginForm.get('email')?.value == this.users[i].email && this.loginForm.get('password')?.value == this.users[i].password){
          this.eduService.setPassword(this.loginForm.get('password')?.value);
          this.eduService.setEmail(this.loginForm.get('email')?.value);
          this.router.navigate(['/stu-dashboard']);
      }
      else{
      }
  }}
}