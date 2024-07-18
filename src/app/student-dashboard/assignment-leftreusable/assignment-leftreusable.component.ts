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
    this.assignmentService.setSelectedAssignment(null);
    console.log("selectedCourse in AssignmentLeftReusableComponent:", this.selectedCourse);
  }

  videoPlay(video: any): void {
    console.log("selectedCourse in videoPlay:", this.selectedCourse);
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
    console.log("left....",assignment);
    if (this.router.url.includes('/stu-dashboard/assignment-detail')) {
      console.log("same page details");
      this.assignmentService.setSelectedAssignment(assignment);
    } else {
      console.log("not from details");
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
