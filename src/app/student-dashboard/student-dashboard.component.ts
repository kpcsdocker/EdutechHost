import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { EdutechService } from '../edutech.service';
import {Router,ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {

  students: any;
  password: any;
  social_picture: any;
  email: any;
  name: any;
  city: any;
  state: any;
  profile: any;
  action!: string;

  constructor(private eduService: EdutechService, private sanitizer: DomSanitizer, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.action = params['action'];
    });
    if(this.action=="treditionalLogin"){
      this.eduService.getStudents().subscribe(data => {this.students = data;
        this.email = this.eduService.getEmail();
        for(var i=0; i<this.students.length; i++){
      		if(this.students[i].email == this.email){
            console.log(this.students[i]);
      			this.name=this.students[i].first_name;
            this.profile=this.students[i].profile;
          }}
      });
    }
    if(this.action=="socialLogin"){
      this.eduService.getSocialLogin().subscribe(data => {this.students = data;
        console.log(this.eduService.getEmail());
        this.email = this.eduService.getEmail();
        for(var i=0; i<this.students.length; i++){
          if(this.students[i].email == this.email){
            this.name=this.students[i].first_name;
            this.social_picture=this.students[i].social_picture;
          }}
      });
    }
  }

}


