import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { EdutechService } from '../../edutech.service';
import { Router } from '@angular/router';
import { ConfirmDialogModule } from '../../confirm-dialog/confirm-dialog.module';
import { ConfirmDialogService } from '../../confirm-dialog/confirm-dialog.service';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';

declare var MathJax: any;

@Component({
  selector: 'app-questions-list',
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.css']
})
export class QuestionsListComponent implements OnInit, AfterViewChecked {

  editForm!: FormGroup;
  questions: any;
  private mathJaxObject;
  isEditQuestionSelected: boolean = false;
  questionById: any;
  isMCQSelected: boolean = false;
  alert!: string;

  constructor(public fb: FormBuilder,public service: EdutechService, private router: Router, private confirmDialogService: ConfirmDialogService) { 
    this.mathJaxObject = MathJax;
  }

  ngOnInit(): void {
    this.getQuestions();
    this.buildForm();
  }

  buildForm() {
    this.editForm = this.fb.group({
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

  getQuestions(){
    this.service.getQuestions().subscribe(data=>{
      this.questions = data; 
      this.renderMath();
    });
  }

  ngAfterViewChecked() {
    this.renderMath();
  }

  renderMath() {
    this.mathJaxObject.typeset();
  }

  questionUpload() {
    this.router.navigate(['/upload']);
  }

  deleteQuestion(id:any){
    this.confirmDialogService.confirmThis('Are you sure to delete ?', () =>  {
      this.service.deleteQuestion(id).subscribe(res=>{
        console.log("deleted");
        this.getQuestions();
      });
    }, () => {
      console.log("Cancel");
    });
  }

  //edit question section
  editQuestion(id:any){
    this.isEditQuestionSelected= true;
    this.service.getQuestionById(id).subscribe(res=>{
      this.questionById = res;
      this.editForm.patchValue(this.questionById);
      if (this.questionById.q_type === 'mcq' && this.questionById.id === id) {
        this.isMCQSelected = true;
        this.populateOptions(this.questionById.options);
      }
      else{
        this.isMCQSelected = false;
      }
    })
  }

  populateOptions(options: any[]) {
    const formArray = this.editForm.get('options') as FormArray;
    options.forEach(option => {
      formArray.push(this.fb.group({
        o_name: option.o_name,
        o_text: option.o_text
      }));
    });
  }

  onQTypeChange(event: any) {
    this.isMCQSelected = event.target.value === 'mcq';
    const options = this.editForm.get('options') as FormArray;
    if (this.isMCQSelected && options.length === 0) {
      this.addOptions();
    }
  }

  addOptions() {
    const options = this.editForm.get('options') as FormArray;
    for (let i = 0; i < 4; i++) {
      options.push(this.fb.group({
        o_name: '',
        o_text: ''
      }));
    }
  }

  getOptionName(index: number, event: FocusEvent) {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value;
    const options = this.editForm.get('options') as FormArray;
    const optionGroup = options.at(index) as FormGroup;

    const optionNames = ['A', 'B', 'C', 'D'];
    optionGroup.get('o_name')?.setValue(optionNames[index] || '');
  }

  onSubmit() {
    console.log(this.editForm.value);
    this.service.updateQuestion(this.editForm.value.id,this.editForm.value).subscribe(
      () => {
        this.getQuestions();
        this.backToListPage();
      },
      error => {
        this.alert = "Error updating the question.";
      }
    );
  }

  get options(): FormArray {
    return this.editForm.get('options') as FormArray;
  }

  alertMessage() {
    this.alert = "Please enter all mandatory fields";
    setTimeout(() => {
      this.alert = '';
    }, 5000);
  }

  backToListPage(){
    this.isEditQuestionSelected= false;
    const options = this.editForm.get('options') as FormArray;
    while (options.length !== 0) {
      options.removeAt(0);
    }
    this.editForm.reset();
  }
}
