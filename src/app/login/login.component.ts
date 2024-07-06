import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder,Validators} from '@angular/forms';
import { EdutechService } from '../edutech.service';
import { Router, ActivatedRoute } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user_id: string = uuidv4();
  students:any;
  users:any;
  loginForm!: FormGroup;
  registrationForm!: FormGroup;
  alreadyUser: boolean = false;
  successMessage!: string;
  errorMessage!: string;
  isPasswordVisible: boolean = false;
  emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  constructor(public fb:FormBuilder, private eduService: EdutechService, private router:Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
  	this.buildForm();
  	this.eduService.getStudents().subscribe(data => {this.students = data;});
    this.route.queryParams.subscribe(params => {
      if (params['login'] === 'success') {
        this.signInWithGoogle();
      }
      if (params['action'] === 'success') {
        this.successMessage="Registered Successful, Now you can login";
        this.autoCloseSuccessMessage(5000);
      }
    });
  }

  login() {
    this.eduService.login();
  } 

  buildForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      password: ['', Validators.required]
    });
    this.registrationForm = this.fb.group({
      user_id: [''], // Include if you want to allow user to enter their ID
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      middle_initial: [''],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      date_of_birth: ['', Validators.required],
      phone_number: ['', Validators.required],
      address_1: [''],
      address_2: [''],
      school: [''],
      grade: [''],
      city: [''],
      state: [''],
      country: [''],
      created_date_time: [''], // You can set this value on the server side
      updated_date_time: [''], // You can set this value on the server side
      password: ['', Validators.required],
      profile: [''],
      social_picture: ['']
    });
  }

  onSubmit(){
    if(this.loginForm.get('email')?.value == "admin@gmail.com" && this.loginForm.get('password')?.value == "edutech@2024"){
      this.eduService.setLoggedinStatus("yes");
      this.router.navigate(['/upload']);
   }
   else{
    for(var i=0; i<this.students.length; i++){
      if(this.loginForm.get('email')?.value == this.students[i].email && this.loginForm.get('password')?.value == this.students[i].password){
          this.eduService.setPassword(this.loginForm.get('password')?.value);
          this.eduService.setEmail(this.loginForm.get('email')?.value);
          const isLoggedIn = "yes";
          this.eduService.checkIsLoggedIn(isLoggedIn);
          this.router.navigate(['/stu-dashboard'], { queryParams: { action: 'treditionalLogin' } });
      }
      else{
        this.autoCloseSuccessMessage(5000);
        this.errorMessage="Sorry We could'nt find an account with the Username/Password";
      }
  }}}

  signInWithGoogle(): void {
  	this.alreadyUser = false; 
    this.eduService.getAuthUser().subscribe((x:any) => 
    	{
    	    this.eduService.getStudents().subscribe(data =>{this.students=data; 
  		    for(var i=0; i<this.students.length; i++){
            if(x.email == this.students[i].email){
              this.eduService.setEmail(x.email);
              const isLoggedIn = "yes";
              this.eduService.checkIsLoggedIn(isLoggedIn);
              this.router.navigate(['/stu-dashboard'], { queryParams: { action: 'socialLogin' } });
          		this.alreadyUser = true; 
            }
  		    }
          if(!this.alreadyUser){
            this.registrationForm.setValue({
              user_id: this.user_id,
              first_name: x.name,
              last_name: '',
              school: '',
              grade: '',
              middle_initial: '',
              email: x.email,
              date_of_birth: '',
              phone_number: '',
              address_1: '',
              address_2: '',
              city: '',
              state: '',
              country: '',
              created_date_time: '', 
              updated_date_time: '', 
              password: '',
              profile: '',
              social_picture: x.picture              
        });
			this.eduService.postSocialLogin(this.registrationForm.value).subscribe(res=>
        { 
          this.eduService.postMongoSocialLogin(this.registrationForm.value).subscribe();
          this.eduService.sendMail(x.email).subscribe();
          this.eduService.setVerificationEmail(x.email);
          this.eduService.checkSocialLogin("yes");
          this.router.navigate(['/verify'], { queryParams: { action: 'register' } });
     		},
         	error=>{console.log("error")});
    	}}); 
    	});
  }

  isEmailInvalid() {
    const emailControl = this.loginForm.get('email');
    return emailControl?.hasError('pattern') && (emailControl.touched || emailControl.dirty);
  }

  autoCloseSuccessMessage(duration: number) {
    setTimeout(() => {
      this.successMessage = '';
      this.errorMessage = '';
    }, duration);
  }

  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
}