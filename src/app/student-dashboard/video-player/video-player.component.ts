import { Component, OnInit } from '@angular/core';
import { ActivatedRoute ,Router} from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { EdutechService } from 'src/app/edutech.service';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent implements OnInit {
  selectedVideo: any;
  selectedVideoUrl: SafeUrl | undefined;
  isNavOpen = false;

  constructor(private route: ActivatedRoute, private router: Router,public sanitizer: DomSanitizer, private service: EdutechService) { }

  ngOnInit(): void {
    this.selectedVideo = history.state.video;
    this.selectedVideoUrl = this.sanitizer.bypassSecurityTrustUrl(this.service.getVideoFile(this.selectedVideo.id));
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