import { Component, OnInit } from '@angular/core';
import { EdutechService } from '../edutech.service';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {

  students: any;
  userName: any;
  email: any;
  grade: any;
  school: any;
  profile: any;

  constructor(private eduService: EdutechService) { }

  ngOnInit(): void {
    this.eduService.getStudents().subscribe(data => {this.students = data; console.log(data);
      this.userName = this.eduService.getUserName();
      this.email = this.eduService.getEmail();
      for(var i=0; i<this.students.length; i++){
        console.log(this.students[i].name,this.userName,this.students[i].email,this.email);
  			if(this.students[i].name == this.userName && this.students[i].email == this.email){
  				this.grade=this.students[i].grade;
          this.school=this.students[i].school;
          this.profile=this.students[i].profile;
        }}
    });
  }

}
