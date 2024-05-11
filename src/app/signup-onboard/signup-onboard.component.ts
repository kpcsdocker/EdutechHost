import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-onboard',
  templateUrl: './signup-onboard.component.html',
  styleUrls: ['./signup-onboard.component.css']
})
export class SignupOnboardComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  redirectToRegister(){
    this.router.navigate(['/register']);
  }
}
