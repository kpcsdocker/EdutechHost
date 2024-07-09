import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

declare var MathJax: any; // Declare MathJax

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css']
})
export class AssignmentDetailComponent implements OnInit {
  assignments: any;
  isNavOpen = false;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.assignments = history.state.assignment;
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
}
