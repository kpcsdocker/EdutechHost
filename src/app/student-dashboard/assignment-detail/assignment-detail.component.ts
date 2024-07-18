import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router  } from '@angular/router';
import { EdutechService } from 'src/app/edutech.service';
import { AssignmentService } from './../assignment.service'; // Adjust the path as necessary
import { Subscription } from 'rxjs';

declare var MathJax: any; // Declare MathJax

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css']
})
export class AssignmentDetailComponent implements OnInit , OnDestroy{
  assignments: any;
  isNavOpen = false;
  course_name: any;
  chatResponse: any;
  filteredAssignments: any;
  groupedAssignments: any;
  selectedCourse: any;
  email: any;
  studentDetails: any;
  assignmentSubscription!: Subscription;

  constructor(private route: ActivatedRoute, private router: Router, private service: EdutechService, private assignmentService: AssignmentService) {}

  ngOnInit(): void {
    this.filteredAssignments = history.state.filteredAssignments;
    this.groupedAssignments = history.state.groupedAssignments;
    this.assignments = history.state.assignment;
    console.log("details page assignments", this.assignments);
    this.email = history.state.email;
    this.studentDetails = history.state.studentDetails;
    this.selectedCourse = history.state.selectedCourse;
    this.course_name = history.state.course_name;

    // Subscribe to the selected assignment changes
    this.assignmentSubscription = this.assignmentService.selectedAssignment$.subscribe(assignment => {
      if (assignment) {
        console.log("from service",assignment);
        this.assignments = assignment;
        setTimeout(() => {
          if (MathJax) {
            MathJax.typeset(); // Ensure MathJax typesets after the content is loaded
          }
        }, 0);
      }
    });

    // Call MathJax after assignments are loaded
    setTimeout(() => {
      if (MathJax) {
        MathJax.typeset(); // Ensure MathJax typesets after the content is loaded
      }
    }, 0);
  }

  ngOnDestroy(): void {
    // Unsubscribe from the subscription to avoid memory leaks
    if (this.assignmentSubscription) {
      this.assignmentSubscription.unsubscribe();
    }
  }

  isMCQ(qType: string): boolean {
    return qType.toLowerCase() === 'mcq';
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

  sendMessage(message: string): void {
    this.service.getChatResponse(message).subscribe(
      response => {
        this.chatResponse = response.response;
        console.log('Chat Response:', response.response);
      },
      error => {
        console.error('Error:', error);
      }
    );
  }

  goBack(): void {
    this.router.navigate(['/stu-dashboard/courses'], {
      state: {
        studentDetails: history.state.studentDetails,
        email: history.state.email
      }
    });
  }
}
