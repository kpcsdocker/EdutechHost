import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router  } from '@angular/router';

declare var MathJax: any; // Declare MathJax

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css']
})
export class AssignmentDetailComponent implements OnInit {
  assignments: any;
  isNavOpen = false;
  course_name: any;

  constructor(private route: ActivatedRoute,private router: Router) {}

  ngOnInit(): void {
    this.assignments = history.state.assignment;
    this.course_name = history.state.course_name;
    console.log(this.assignments);

    // Call MathJax after assignments are loaded
    setTimeout(() => {
      if (MathJax) {
        MathJax.typeset(); // Ensure MathJax typesets after the content is loaded
      }
    }, 0);
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

  goBack(): void {
    this.router.navigate(['/stu-dashboard/courses'], {
      state: {
        studentDetails: history.state.studentDetails,
        email: history.state.email
      }
    });
  }
}
