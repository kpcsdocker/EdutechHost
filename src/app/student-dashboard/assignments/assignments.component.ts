import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EdutechService } from '../../edutech.service';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {
  isNavOpen = false;
  selectedCourse: any;
  assignments: any;
  studentDetails: any;
  email: any;
  name: any;
  profile:any;
  social_picture:any;
  groupedAssignments: any = {};
  selectedCategory: string | null = null;
  selectedAssignmentType: string | null = null;
  filteredAssignments: any[] = [];
  chatResponse:any;
  course_name: any;

  constructor(private eduService: EdutechService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.selectedCourse = history.state.course;
    this.course_name = history.state.course.course_name;
    console.log(this.course_name);
    this.name = history.state.name;
    this.studentDetails= history.state.studentDetails;
    this.email = history.state.email;
    this.profile= history.state.profile;
    this.social_picture= history.state.social_picture;
    this.assignments = history.state.assignments;
    this.filterAssignments();
    this.groupAssignmentsByCategoryAndType();
  }

  filterAssignments(): void {
    this.filteredAssignments = this.assignments.filter((assignment: any) => assignment.filePath);
  }

  groupAssignmentsByCategoryAndType(): void {
    this.assignments.forEach((assignment: any) => {
      if (assignment.assignment && (assignment.assignment === 'qz' || assignment.assignment === 'hw')) {
        const key = `${assignment.category_name}:${assignment.assignment}`;
        if (!this.groupedAssignments[key]) {
          this.groupedAssignments[key] = [];
        }
        this.groupedAssignments[key].push(assignment);
      }
    });
  }

  assignmentKeys(): string[] {
    return Object.keys(this.groupedAssignments);
  }

  videoPlay(video: any): void {
    this.router.navigate(['/stu-dashboard/video-player'], { state: { video, course_name: this.course_name,studentDetails: history.state.studentDetails, email: history.state.email, filteredAssignments: this.filteredAssignments, groupedAssignments: this.groupedAssignments, selectedCourse: this.selectedCourse  } });
  }

  viewAssignmentDetails(assignment: any): void {
    this.router.navigate(['/stu-dashboard/assignment-detail'], { state: { assignment, course_name: this.course_name, selectedCourse: this.selectedCourse, studentDetails: history.state.studentDetails, email: history.state.email, filteredAssignments: this.filteredAssignments, groupedAssignments: this.groupedAssignments  } });
  }

  openNav() {
    this.isNavOpen = true;
    document.getElementById("mySidenav")!.classList.add('open');
    document.getElementById("mainContent")!.classList.add('shift-right');
  }

  closeNav() {
    this.isNavOpen = false;
    document.getElementById("mySidenav")!.classList.remove('open');
    document.getElementById("mainContent")!.classList.remove('shift-right');
  }

  calculateProgress(): number {
    return (this.filteredAssignments.length / this.assignments.length) * 100;
  }

  sendMessage(message: string): void {
    this.eduService.getChatResponse(message).subscribe(
      response => {
        this.chatResponse = response.response;
        console.log('Chat Response:', response.response);
      },
      error => {
        console.error('Error:', error);
      }
    );
  }
}
