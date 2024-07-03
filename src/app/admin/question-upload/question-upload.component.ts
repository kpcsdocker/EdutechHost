import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { EdutechService } from '../../edutech.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question-upload',
  templateUrl: './question-upload.component.html',
  styleUrls: ['./question-upload.component.css']
})
export class QuestionUploadComponent implements OnInit {

  questionForm!: FormGroup;
  isMCQSelected: boolean = false;
  alert!: string;

  constructor(public fb: FormBuilder, public service: EdutechService, private router: Router) { }

  ngOnInit(): void {
    this.buildForm();
    this.selectOptions();
  }

  buildForm() {
    this.questionForm = this.fb.group({
      id: [''],
      subject: ['',[Validators.required]],
      q_ans: ['',[Validators.required]],
      q_type: ['',[Validators.required]],
      q: ['',[Validators.required]],
      cat: [''],
      subcat: [''],
      diff: [''],
      options: this.fb.array([])
    });
  }

  onQTypeChange(event:any){
      console.log(event.target.value);
      if(event.target.value=="mcq"){
        this.isMCQSelected=true;
      }
      if(event.target.value=="dque"){
        this.isMCQSelected=false;
      }
  }

  selectOptions() {
    const opt = this.questionForm.get('options') as FormArray;
    for (let i = 0; i < 4; i++) {
      opt.push(this.fb.group({
        o_name: '',
        o_text: ''
      }));
    }
  }

  questionsList(){
    this.router.navigate(['/list']);
  }

  getOptionName(index: number, event: FocusEvent) {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value;
    const options = this.questionForm.get('options') as FormArray;
    const optionGroup = options.at(index) as FormGroup;

    switch (index) {
      case 0:
        optionGroup.get('o_name')?.setValue('A');
        break;
      case 1:
        optionGroup.get('o_name')?.setValue('B');
        break;
      case 2:
        optionGroup.get('o_name')?.setValue('C');
        break;
      case 3:
        optionGroup.get('o_name')?.setValue('D');
        break;
      default:
        break;
    }
  }

  onSubmit() {
    console.log(this.questionForm.value);
    this.service.postQuestions(this.questionForm.value).subscribe(
      data => {this.router.navigate(['/list']);}
    );
  }

  get options(): FormArray {
    return this.questionForm.get('options') as FormArray;
  }

  alertMessage(){
    setTimeout(() => {
      this.alert="please enter all mandatory fields";
    }, 5000);
  }
}
