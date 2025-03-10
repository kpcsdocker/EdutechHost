import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import { EdutechService } from '../edutech.service';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
export class VerificationComponent implements OnInit {

  code!: string;
  email!: string;
  user!: any;
  successMessage!: string;
  errorMessage!: string;
  action!: string;
  constructor(private eduService: EdutechService, private router:Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.eduService.getAuthUser().subscribe(user => {
      this.user = user;
    });
    this.route.queryParams.subscribe(params => {
      this.action = params['action'];
      console.log(this.action);
    });
  }
  
  verifyCode() {
    console.log(this.eduService.getVerificationEmail());
    this.eduService.verifyCode(this.eduService.getVerificationEmail(), this.code).subscribe({
      next: response => {
        if(response!='Verification Failed'){
          this.successMessage = 'Successfully Verified Your Account';
          this.errorMessage = ''; 
        setTimeout(() => {
          if(this.action=="traditionalLogin"){
            this.router.navigate(['/login'], { queryParams: { action: 'success' } });
          }
          if(this.action=="socialLogin"){
            this.eduService.checkSocialLogin("yes");
            this.router.navigate(['/stu-dashboard'], { queryParams: { action: 'socialLogin' } });
          }
          if(this.action=="register"){
            this.eduService.checkSocialLogin("yes");
            this.router.navigate(['/update']);
          }
        }, 3000);
        }
        else{
          this.errorMessage = 'Incorrect  Verification Code';
          this.successMessage = ''; 
        }
      }
    });
  }

  ResendMail(){
    this.eduService.sendMail(this.eduService.getVerificationEmail()).subscribe(data=>
      {this.successMessage = 'Please check your mail';
      setTimeout(() => {
        this.successMessage = '';
        this.errorMessage = '';
      }, 5000);
      }
    );
  }
}