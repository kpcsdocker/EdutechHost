import { Component, OnInit } from '@angular/core';
import { EdutechService } from '../edutech.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  loginSuccess: boolean = false;
  user_id: string = uuidv4();
  registrationForm!: FormGroup;
  alreadyUser: boolean = false;
  emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  imageFile!: File;
  alert!: string;

  constructor(
    private eduService: EdutechService,
    public fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: [''],
      middle_initial: [''],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      grade: ['', Validators.required],
      school: ['', Validators.required],
      date_of_birth: [''],
      phone_number: ['', Validators.required],
      address_1: [''],
      address_2: [''],
      city: [''],
      state: [''],
      country: [''],
      password: ['', [Validators.required, Validators.minLength(6)]],
      profile: [null, Validators.required]
    });
  }

  login() {
    this.eduService.login();
  }

  onSubmit(): void {
    if (this.registrationForm.valid) {
      const formData = new FormData();
      formData.append('id', " ");
      formData.append('user_id', this.user_id);
      formData.append('first_name', this.registrationForm.get('first_name')?.value);
      formData.append('last_name', this.registrationForm.get('last_name')?.value);
      formData.append('middle_initial', this.registrationForm.get('middle_initial')?.value);
      formData.append('email', this.registrationForm.get('email')?.value);
      formData.append('grade', this.registrationForm.get('grade')?.value);
      formData.append('school', this.registrationForm.get('school')?.value);
      const dateOfBirth = this.registrationForm.get('date_of_birth')?.value;
      if (dateOfBirth) {
        formData.append('date_of_birth', new Date(this.registrationForm.get('date_of_birth')?.value).toISOString());
      } else {
        formData.append('date_of_birth', ''); 
      }
      formData.append('phone_number', this.registrationForm.get('phone_number')?.value);
      formData.append('address_1', this.registrationForm.get('address_1')?.value);
      formData.append('address_2', this.registrationForm.get('address_2')?.value);
      formData.append('city', this.registrationForm.get('city')?.value);
      formData.append('state', this.registrationForm.get('state')?.value);
      formData.append('country', this.registrationForm.get('country')?.value);
      formData.append('created_date_time', new Date().toISOString());
      formData.append('updated_date_time', new Date().toISOString());
      formData.append('password', this.registrationForm.get('password')?.value);
      if (this.imageFile) {
        formData.append('profile', this.imageFile);
      }
      else {
        formData.append('profile', new Blob([])); // Append an empty Blob if no file is selected
      }
      console.log("printing"+this.imageFile);
      this.eduService.mongoStudentSubmit(formData).subscribe(res => {});
      this.eduService.postgresStudentSubmit(formData).subscribe(res => {
            this.eduService.sendMail(this.registrationForm.get('email')?.value).subscribe();
            this.eduService.setVerificationEmail(this.registrationForm.get('email')?.value);
            this.eduService.checkIsRegistered("yes");
            this.router.navigate(['/verify'], { queryParams: { action: 'traditionalLogin' } });
      });
    }
  }

  isEmailInvalid() {
    const emailControl = this.registrationForm.get('email');
    return emailControl?.hasError('pattern') && (emailControl.touched || emailControl.dirty);
  }

  onFileSelected(event: any): void {
    this.imageFile = event.target.files[0];
  }

  alertMessage(){
      this.alert="please enter all mandatory fields";
  }
}
