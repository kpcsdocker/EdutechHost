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
  selectedVideoUrl: any;

  constructor(private route: ActivatedRoute, public sanitizer: DomSanitizer, private service: EdutechService) { }

  ngOnInit(): void {
    this.selectedVideo = history.state.video;
    this.selectedVideoUrl = this.service.getVideoFile(this.selectedVideo.id);
  }
}
