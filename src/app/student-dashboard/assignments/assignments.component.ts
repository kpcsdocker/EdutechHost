import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router  } from '@angular/router';
import { EdutechService } from '../../edutech.service';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {
  isNavOpen = false;
  isNavOpen1 = false;
  selectedVideo: any;

  constructor(private eduService: EdutechService,private route: ActivatedRoute,private router: Router,) { }

  ngOnInit(): void {
    this.selectedVideo = history.state.video;
  }

  videoPlay(video: any): void {
    this.router.navigate(['/stu-dashboard/video-player'], { state: { video } });
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
