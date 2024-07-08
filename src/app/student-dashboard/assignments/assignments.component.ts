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
  isNavOpen1 = false;
  selectedCourse: any;
  assignments: any;
  name: any;
  groupedAssignments: any = {};
  selectedSubcategory: string | null = null;
  selectedAssignmentType: string | null = null;
  filteredAssignments: any[] = [];

  constructor(private eduService: EdutechService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.selectedCourse = history.state.course;
    this.name = history.state.name;
    this.assignments = history.state.assignments;
    console.log("assignment page", this.assignments);
    this.groupAssignmentsBySubcategoryAndType();
  }

  groupAssignmentsBySubcategoryAndType(): void {
    this.assignments.forEach((assignment: any) => {
      if (assignment.assignment && (assignment.assignment === 'qz' || assignment.assignment === 'hw')) {
        const key = `${assignment.subcategory_name} ${assignment.assignment}`;
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

  selectSubcategoryAndType(subcategory: string, type: string): void {
    this.selectedSubcategory = subcategory;
    this.selectedAssignmentType = type;
    const key = `${subcategory} ${type}`;
    this.filteredAssignments = this.groupedAssignments[key] || [];
  }

  videoPlay(video: any): void {
    this.router.navigate(['/stu-dashboard/video-player'], { state: { video } });
  }
  
  viewAssignmentDetails(assignment: any): void {
    this.router.navigate(['/stu-dashboard/assignment-detail'], { state: { assignment } });
  }
  
  openNav1() {
    this.isNavOpen1 = true;
    document.getElementById("mySidenav1")!.classList.add('open');
    document.getElementById("mainContent")!.classList.add('shift-left');
  }

  closeNav1() {
    this.isNavOpen1 = false;
    document.getElementById("mySidenav1")!.classList.remove('open');
    document.getElementById("mainContent")!.classList.remove('shift-left');
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
