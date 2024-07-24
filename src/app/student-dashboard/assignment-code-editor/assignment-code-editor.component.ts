import { Component, OnInit } from '@angular/core';
import { EdutechService } from 'src/app/edutech.service';

@Component({
  selector: 'app-assignment-code-editor',
  templateUrl: './assignment-code-editor.component.html',
  styleUrls: ['./assignment-code-editor.component.css']
})
export class AssignmentCodeEditorComponent implements OnInit {
  code!: string;
  language!: string;
  response: any;
  isNavOpen = false;
  course_name: any;
  chatResponse: any;
  filteredAssignments: any;
  groupedAssignments: any;
  selectedCourse: any;
  email: any;
  studentDetails: any;
  assignments: any;
 
  ngOnInit(){
    this.filteredAssignments = history.state.filteredAssignments;
    this.groupedAssignments = history.state.groupedAssignments;
    this.assignments = history.state.assignment;
    this.email = history.state.email;
    this.studentDetails = history.state.studentDetails;
    this.selectedCourse = history.state.selectedCourse;
    this.course_name = history.state.course_name;
  }
  constructor(private service: EdutechService) {}

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

  executeCode() {
    this.service.getCodeEditorResponse(this.code, this.language).subscribe(
      (result) => {
        this.response = result;
        console.log('Code execution result:', this.response);
      },
      (error) => {
        console.error('Error executing code:', error);
      }
    );
  }
}