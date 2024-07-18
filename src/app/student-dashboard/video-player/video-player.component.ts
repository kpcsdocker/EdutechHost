import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { EdutechService } from 'src/app/edutech.service';
import { AssignmentService } from '../assignment.service';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent implements OnInit {
  selectedVideo: any;
  selectedVideoUrl: SafeUrl | undefined;
  isNavOpen = false;
  chatResponse: any;
  assignments: any;
  course_name: any;
  filteredAssignments: any;
  groupedAssignments: any;
  selectedCourse: any;
  email: any;
  studentDetails: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public sanitizer: DomSanitizer,
    private service: EdutechService,
    private assignmentService: AssignmentService
  ) { }

  ngOnInit(): void {
    this.selectedCourse = history.state.selectedCourse;
    this.course_name = history.state.course_name;
    this.studentDetails = history.state.studentDetails;
    this.email = history.state.email;
    this.assignments = history.state.assignments;
    this.filteredAssignments = history.state.filteredAssignments;
    this.groupedAssignments = history.state.groupedAssignments;
    this.selectedVideo = history.state.video;

    console.log("History state data in ngOnInit of VideoPlayerComponent:", history.state);

    if (this.selectedVideo && this.selectedVideo.id) {
      this.selectedVideoUrl = this.sanitizer.bypassSecurityTrustUrl(this.service.getVideoFile(this.selectedVideo.id));
    } else {
      console.error("Selected video or video id is undefined");
    }

    // Subscribe to selected video changes
    this.assignmentService.selectedVideo$.subscribe(video => {
      if (video) {
        this.selectedVideo = video;
        this.selectedVideoUrl = this.sanitizer.bypassSecurityTrustUrl(this.service.getVideoFile(this.selectedVideo.id));
        console.log("Updated selectedVideo from service:", this.selectedVideo);
      }
    });
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
        studentDetails: this.studentDetails,
        email: this.email
      }
    });
  }
}
