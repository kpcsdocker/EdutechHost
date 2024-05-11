import { Component, OnInit } from '@angular/core';
import { EdutechService } from '../edutech.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  name!: string;
  email!: string;
  grade!: string;
  school!: string;
  imageFile!: File;

  constructor(private eduService: EdutechService) {}

  ngOnInit(): void {
  }

  onSubmit(){
    const formData = new FormData();
    formData.append('id', " ")
    formData.append('name', this.name);
    formData.append('email', this.email);
    formData.append('grade', this.grade);
    formData.append('school', this.school);
    formData.append('profile', this.imageFile);
    this.eduService.imageSubmit(formData).subscribe(res=>{console.log(res);});
}
  
  onFileSelected(event:any) {
    this.imageFile = event.target.files[0];
  }
}
