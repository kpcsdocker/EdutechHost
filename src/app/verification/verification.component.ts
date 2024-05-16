import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { EdutechService } from '../edutech.service';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
export class VerificationComponent implements OnInit {

  code!: string;
  email!: string;
  successMessage!: string;
  errorMessage!: string;
  constructor(private eduService: EdutechService, private router:Router) { }

  ngOnInit(): void {
  }
  
  verifyCode() {
    this.eduService.verifyCode(this.eduService.getVerificationEmail(), this.code).subscribe({
      next: response => {
        if(response!='Verification Failed'){
          this.successMessage = 'Verification successful';
          this.errorMessage = ''; 
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3000);
        }
        else{
          this.errorMessage = 'Incorrect code';
          this.successMessage = ''; 
        }
      }
    });
  }
}