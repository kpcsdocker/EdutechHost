import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  isNavOpen1 = false;

  constructor(private route: ActivatedRoute, public sanitizer: DomSanitizer, private service: EdutechService) { }

  ngOnInit(): void {
    this.selectedVideo = history.state.video;
    this.selectedVideoUrl = this.sanitizer.bypassSecurityTrustUrl(this.service.getVideoFile(this.selectedVideo.id));
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