import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { EdutechService } from 'src/app/edutech.service';
import { AssignmentService } from '../assignment.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent implements OnInit, OnDestroy {
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
  private videoSubscription!: Subscription;
  @ViewChild('videoPlayer', { static: false }) videoPlayer: ElementRef | undefined;

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
    
    if (this.selectedVideo && this.selectedVideo.id) {
      this.updateVideoUrl(this.selectedVideo.id);
    } else {
      console.error("Selected video or video id is undefined");
    }

    // Subscribe to the selected video changes
    this.videoSubscription = this.assignmentService.selectedVideo$.subscribe(video => {
      if (video) {
        this.selectedVideo = video;
        this.updateVideoUrl(this.selectedVideo.id);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.videoSubscription) {
      this.videoSubscription.unsubscribe();
    }
  }

  updateVideoUrl(videoId: string): void {
    this.selectedVideoUrl = this.sanitizer.bypassSecurityTrustUrl(this.service.getVideoFile(videoId));
    this.videoPlayer?.nativeElement.load(); // video element reloads the new URL
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
