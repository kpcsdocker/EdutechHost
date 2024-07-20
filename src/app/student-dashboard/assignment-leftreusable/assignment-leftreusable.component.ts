import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssignmentService } from './../assignment.service';

@Component({
  selector: 'app-assignment-leftreusable',
  templateUrl: './assignment-leftreusable.component.html',
  styleUrls: ['./assignment-leftreusable.component.css']
})
export class AssignmentLeftReusableComponent implements OnInit {
  @Input() assignments: any[] = [];
  @Input() groupedAssignments: any = {};
  @Input() email: string = '';
  @Input() course_name: string = '';
  @Input() studentDetails: any = {};
  @Input() selectedCourse: any = '';
  @Input() filteredAssignments: any = '';

  constructor(private router: Router, private assignmentService: AssignmentService) { }

  ngOnInit(): void {
    //to remove previous video data when navigating back and forth
    this.assignmentService.setSelectedAssignment(null);
    this.assignmentService.setSelectedVideo(null);
  }

  videoPlay(video: any): void {
    if (!this.selectedCourse || !this.selectedCourse.course_name) {
      console.error("selectedCourse or course_name is undefined");
      return;
    }

    if (this.router.url.includes('/stu-dashboard/video-player')) {
      this.assignmentService.setSelectedVideo(video);
    } else {
      this.router.navigate(['/stu-dashboard/video-player'], {
        state: {
          video,
          course_name: this.selectedCourse.course_name,
          studentDetails: this.studentDetails,
          email: this.email,
          filteredAssignments: this.filteredAssignments,
          groupedAssignments: this.groupedAssignments,
          selectedCourse: this.selectedCourse
        }
      });
    }
  }

  viewAssignmentDetails(assignment: any): void {
    if (this.router.url.includes('/stu-dashboard/assignment-detail')) {
      this.assignmentService.setSelectedAssignment(assignment);
    } else {
      this.router.navigate(['/stu-dashboard/assignment-detail'], {
        state: {
          assignment,
          course_name: this.course_name,
          selectedCourse: this.selectedCourse,
          studentDetails: this.studentDetails,
          email: this.email,
          filteredAssignments: this.filteredAssignments,
          groupedAssignments: this.groupedAssignments
        }
      });
    }
  }

  assignmentKeys(): string[] {
    return Object.keys(this.groupedAssignments);
  }

  goBack(): void {
    this.assignments = [];
    this.groupedAssignments = {};
    this.filteredAssignments = [];
    this.assignmentService.setSelectedAssignment(null); 
    this.router.navigate(['/stu-dashboard/courses'], {
      state: {
        studentDetails: this.studentDetails,
        email: this.email
      }
    });
  }
}
