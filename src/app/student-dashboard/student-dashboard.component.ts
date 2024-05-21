import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { EdutechService } from '../edutech.service';

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
  address1: any;
  city: any;
  state: any;
  profile: any;

  constructor(private eduService: EdutechService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    // this.eduService.getSocialLogin().subscribe(data => {this.students = data;
    //   this.password = this.eduService.getPassword();
    //   this.email = this.eduService.getEmail();
    //   for(var i=0; i<this.students.length; i++){
  	// 		if(this.students[i].email == this.email){
    //       console.log(this.students[i]);
  	// 			this.address1=this.students[i].address1;
    //       this.city=this.students[i].city;
    //       this.state=this.students[i].state;
    //       this.profile=this.sanitizer.bypassSecurityTrustResourceUrl(this.students[i].profile);
    //       this.social_picture=this.students[i].social_picture;
    //       console.log(this.social_picture);
    //     }}
    // });
    this.eduService.getStudents().subscribe(data => {this.students = data;
        this.password = this.eduService.getPassword();
        this.email = this.eduService.getEmail();
        for(var i=0; i<this.students.length; i++){
      		if(this.students[i].email == this.email){
            console.log(this.students[i]);
      			this.address1=this.students[i].address1;
            this.city=this.students[i].city;
            this.state=this.students[i].state;
            this.profile=this.sanitizer.bypassSecurityTrustResourceUrl(this.students[i].profile);
            this.social_picture=this.students[i].social_picture;
            console.log(this.social_picture);
          }}
      });
  }

}
