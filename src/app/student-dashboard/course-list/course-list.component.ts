import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router  } from '@angular/router';
import { EdutechService } from '../../edutech.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {
  students: any;
  email!: string;
  name: any;
  profile: any;
  social_picture: any;
  videos!: any;

  constructor(private eduService: EdutechService,private route: ActivatedRoute,private router: Router,) { }

  ngOnInit(): void {
    this.students = history.state.studentDetails;
    this.email = history.state.email;
    console.log("list",history.state.studentDetails);
    this.loadCourses();
  }

  loadCourses(): void {
    for (let i = 0; i < this.students.length; i++) {
      if (this.students[i].email === this.email) {
        this.name = this.students[i].first_name;
        this.profile = this.students[i].profile;
        this.social_picture = this.students[i].social_picture;
        console.log(this.students[i].user_id);
        this.eduService.getVideosForStudent(this.students[i].user_id).subscribe(
          videos => {
            console.log(videos);
            this.videos = videos;
            console.log('Videos for student:', this.videos);
          },
          error => {
            console.error('Error loading videos:', error);
          }
        );

        break;
      }
    }
  }

  selectCourse(video: any): void {
    this.router.navigate(['/stu-dashboard/video-player'], { state: { video } });
  }
}
