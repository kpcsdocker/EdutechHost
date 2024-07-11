import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router  } from '@angular/router';
import { EdutechService } from '../../edutech.service';
import { forkJoin } from 'rxjs';

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
  courses: any;

  constructor(private eduService: EdutechService,private route: ActivatedRoute,private router: Router,) { }

  ngOnInit(): void {
    this.students = history.state.studentDetails;
    this.email = history.state.email;
    this.loadCourses();
  }

  loadCourses(): void {
    for (let i = 0; i < this.students.length; i++) {
      if (this.students[i].email === this.email) {
        this.name = this.students[i].first_name;
        this.profile = this.students[i].profile;
        this.social_picture = this.students[i].social_picture;

        //forkJoin wait for both the getQuestionsForStudent and getVideosForStudent API calls 
        forkJoin({
          questions: this.eduService.getQuestionsForStudent(this.students[i].user_id),
          videos: this.eduService.getVideosForStudent(this.students[i].user_id)
        }).subscribe(
          (response: { questions: any, videos: any }) => {
            let questions = response.questions;
            let videos = response.videos;
  
            // Ensure questions and videos are arrays
            if (!Array.isArray(questions)) {
              questions = Object.values(questions);
            }
            if (!Array.isArray(videos)) {
              videos = Object.values(videos);
            }
  
            console.log('from questions', questions);
            console.log('from video', videos);
  
            // Combine questions and videos and remove duplicates
            //Spread Operator ...
            const combinedCourses = [...questions, ...videos];
            console.log("combined Assignments List", combinedCourses);
            const uniqueCourses = this.removeDuplicateCourses(combinedCourses);
  
            // Calculate the number of assignments per unique course
            this.courses = this.calculateCourseAssignments(uniqueCourses, combinedCourses);
            console.log('Combined unique courses for student:', this.courses);
          },
          error => {
            console.error('Error loading courses:', error);
          }
        );
  
        break;
      }
    }
  }
  
  removeDuplicateCourses(courses: any[]): any[] {
    const uniqueCoursesMap = new Map();
    for (const course of courses) {
      uniqueCoursesMap.set(course.course_id, course);
    }
    return Array.from(uniqueCoursesMap.values());
  }
  
  calculateCourseAssignments(uniqueCourses: any[], combinedCourses: any[]): any[] {
    return uniqueCourses.map(course => {
      const courseAssignments = combinedCourses.filter(assignment => assignment.course_id === course.course_id);
      return {
        ...course,
        assignmentCount: courseAssignments.length,
        assignments: courseAssignments  // Include assignments data
      };
    });
  }

  selectCourse(course: any): void {
    const courseAssignments = this.courses.find((c:any) => c.course_id === course.course_id)?.assignments || [];
    console.log(courseAssignments);
    this.router.navigate(['/stu-dashboard/assignments'], { state: { course, name: this.name, assignments: courseAssignments, profile: this.profile, social_picture: this.social_picture, studentDetails: this.students, email: this.email } });
  }  
}
