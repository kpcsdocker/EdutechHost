import { Component, OnInit } from '@angular/core';
import { EdutechService } from '../edutech.service';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {

  students: any;
  password: any;
  email: any;
  address1: any;
  city: any;
  state: any;

  constructor(private eduService: EdutechService) { }

  ngOnInit(): void {
    this.eduService.getUsers().subscribe(data => {this.students = data; console.log(data);
      this.password = this.eduService.getPassword();
      this.email = this.eduService.getEmail();
      for(var i=0; i<this.students.length; i++){
  			if(this.students[i].password == this.password && this.students[i].email == this.email){
  				this.address1=this.students[i].address1;
          this.city=this.students[i].city;
          this.state=this.students[i].state;
        }}
    });
  }

}
