import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import {catchError, retry} from 'rxjs/operators';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { Category, Subcategory, Course, CourseSubcategory } from './models';

@Injectable({
  providedIn: 'root'
})
export class EdutechService {

  private student: string = environment.studentUrl;
  private api: string = environment.apiUrl;
  private mongo: string = environment.mongoUrl;
  private postgres: string = environment.postgresUrl;
  private auth: string = environment.authUrl;
  private authmongo: string = environment.authMongoUrl;
  private oauth2: string = environment.oauth2Url;
  private questions: string = environment.questions;
  private isLoggedInValue: string ="";
  private isRegistered: string ="";
  private isSocialLogedin: string = "";
  password!: string;
  email!: string;
  code!: string;
  
  constructor(private httpclient: HttpClient) { }

  public getStudents(){
    return this.httpclient.get(this.postgres+'/students', {headers: new HttpHeaders({'Content-Type':  'application/json'})}).pipe(catchError((err:any)=>this.handleErrorPromise(err)));
  }

  login(){
    window.location.href= this.oauth2;
  }

  public getAuthUser(){
    return this.httpclient.get(this.auth+'/user', {headers: new HttpHeaders({'Content-Type':  'application/json'})}).pipe(catchError((err:any)=>this.handleErrorPromise(err)));
  }

  public mongoStudentSubmit(studentData:FormData){
    return this.httpclient.post(this.mongo+'/student/register', studentData, { observe: 'response' })
    .pipe(
      catchError((err:any)=>this.handleErrorPromise(err))
    );
  }

  public postgresStudentSubmit(studentData:FormData){
    return this.httpclient.post(this.postgres+'/student/register', studentData, { observe: 'response' })
    .pipe(
    catchError((err:any)=>this.handleErrorPromise(err)));
 }

  handleErrorPromise (error: Response | any) {
    console.error(error.message || error);
    return Promise.reject(error.message || error);
  }

  public setPassword(password:any){
   this.password=password;
  }

  public getPassword(){
    return this.password;
  }

  public setEmail(email:any){
    this.email=email;
  }
  
  public getEmail(){
    return this.email;
  }
  
  public sendMail(email:any){
    return this.httpclient.get(this.api+'/sendVerificationCode/'+email, {responseType: 'text'});
  }
  
  public getSocialLogin(){
    return this.httpclient.get(this.auth, {headers: new HttpHeaders({'Content-Type':  'application/json'})}).pipe(catchError((err:any)=>this.handleErrorPromise(err)));
  }
  
  public getSocialLoginById(id:any){
    return this.httpclient.get(this.auth+"/students/"+id, {headers: new HttpHeaders({'Content-Type':  'application/json'})}).pipe(catchError((err:any)=>this.handleErrorPromise(err)));
  }
  
  public updateSocialLogin(id:any,student:any){
    return this.httpclient.put(this.auth+"/students/"+id,student,{headers: new HttpHeaders({'Content-Type':  'application/json'})}).pipe(catchError((err:any)=>this.handleErrorPromise(err)));
  }
  
  public postSocialLogin(student:any){
    return this.httpclient.post(this.auth, student, {headers: new HttpHeaders({'Content-Type':  'application/json'})})
    .pipe(
      catchError((err:any)=>this.handleErrorPromise(err))
    );
  }

  public postMongoSocialLogin(student:any){
    return this.httpclient.post(this.authmongo+"/students", student, {headers: new HttpHeaders({'Content-Type':  'application/json'})})
    .pipe(
      catchError((err:any)=>this.handleErrorPromise(err))
    );
  }

  public updateMongoSocialLogin(id:any,student:any){
    return this.httpclient.put(this.authmongo+"/students/"+id,student,{headers: new HttpHeaders({'Content-Type':  'application/json'})}).pipe(catchError((err:any)=>this.handleErrorPromise(err)));
  }
  
  verifyCode(email: string, code: string) {
    console.log(email,code);
    return this.httpclient.get(this.api+'/verifyCode/'+email+'/'+code, { responseType: 'text' });
  }
  
  public setVerificationEmail(email:any){
    console.log(email);
    this.email=email;
  }
  
  public getVerificationEmail(){
    return this.email;
  }
  
  public setVerificationCode(code:any){
    this.code=code;
  }
  
  public getVerificationCode(){
    return this.email;
  }
  
  checkIsLoggedIn(isLoggedIn: string): void {
     this.isLoggedInValue = isLoggedIn;
  }

  getIsLoggedInStatus(): string | null {
    return this.isLoggedInValue;
  }

  checkIsRegistered(isRegistered: string){
    this.isRegistered = isRegistered;
  }

  isRegistrationComplete(): string | null {
    return this.isRegistered;
  }

  checkSocialLogin(isSocialLogedin: string){
    this.isSocialLogedin = isSocialLogedin;
  }

  isSocialLogin(): string | null{
    return this.isSocialLogedin;
  }

  getQuestionsForStudent(studentId: string){
    return this.httpclient.get(this.questions+'/student/'+studentId, {headers: new HttpHeaders({'Content-Type':  'application/json'})}).pipe(catchError((err:any)=>this.handleErrorPromise(err)));
  }

  getVideosForStudent(studentId: string){
    return this.httpclient.get(this.api+'/videos/student/'+studentId, {headers: new HttpHeaders({'Content-Type':  'application/json'})}).pipe(catchError((err:any)=>this.handleErrorPromise(err)));
  }

  getVideoFileUrl(id: string){
    return this.httpclient.get(this.api+'/video/list', {headers: new HttpHeaders({'Content-Type':  'application/json'})}).pipe(catchError((err:any)=>this.handleErrorPromise(err)));
  }

  getVideoFile(id: string): string {
    return `${this.api}/video/${id}/file`;
  }

  public getQuestions(){
    return this.httpclient.get(this.questions, {headers: new HttpHeaders({'Content-Type':  'application/json'})}).pipe(catchError((err:any)=>this.handleErrorPromise(err)));
  }

  public getQuestionById(id:any){
    return this.httpclient.get(this.questions+"/"+id, {headers: new HttpHeaders({'Content-Type':  'application/json'})}).pipe(catchError((err:any)=>this.handleErrorPromise(err)));
  }

  public postQuestions(questions:any){
    return this.httpclient.post(this.questions, questions, {headers: new HttpHeaders({'Content-Type':  'application/json'})}).pipe(catchError((err:any)=>this.handleErrorPromise(err)));
  }

  public updateQuestion(id:any,question:any){
    return this.httpclient.put(this.questions+"/"+id,question,{headers: new HttpHeaders({'Content-Type':  'application/json'})}).pipe(catchError((err:any)=>this.handleErrorPromise(err)));
  }

  public deleteQuestion(id:any){
    return this.httpclient.delete(this.questions+'/delete/'+id, {headers: new HttpHeaders({'Content-Type':  'application/json'})}).pipe(catchError((err:any)=>this.handleErrorPromise(err)));
  }

  public getCourses(): Observable<Course[]>{
    return this.httpclient.get<Course[]>(this.api+"/courses", {headers: new HttpHeaders({'Content-Type':  'application/json'})}).pipe(catchError((err:any)=>this.handleErrorPromise(err)));
  }

  public getCategories(): Observable<Category[]>{
    return this.httpclient.get<Category[]>(this.api+"/categories", {headers: new HttpHeaders({'Content-Type':  'application/json'})}).pipe(catchError((err:any)=>this.handleErrorPromise(err)));
  }

  public getSubcategories(): Observable<Subcategory[]> {
    return this.httpclient.get<Subcategory[]>(this.api+"/subcategories", {headers: new HttpHeaders({'Content-Type':  'application/json'})}).pipe(catchError((err:any)=>this.handleErrorPromise(err)));
  }

  public getCourseSubcategories(): Observable<CourseSubcategory[]>{
    return this.httpclient.get<CourseSubcategory[]>(this.api+"/course-subcategories", {headers: new HttpHeaders({'Content-Type':  'application/json'})}).pipe(catchError((err:any)=>this.handleErrorPromise(err)));
  }

  public videoUpload(form:FormData){
    return this.httpclient.post(this.api+'/videos/upload', form, { observe: 'response' })
    .pipe(
    catchError((err:any)=>this.handleErrorPromise(err)));
 }

 public updateVideo(form:FormData,id:any){
  return this.httpclient.put(this.api+'/video/'+id, form, { observe: 'response' })
  .pipe(
  catchError((err:any)=>this.handleErrorPromise(err)));
}

 public getVideosList(){
  return this.httpclient.get(this.api+'/video/list', {headers: new HttpHeaders({'Content-Type':  'application/json'})}).pipe(catchError((err:any)=>this.handleErrorPromise(err)));
 }

 public getVideosById(id:any){
  return this.httpclient.get(this.api+'/video/'+id, {headers: new HttpHeaders({'Content-Type':  'application/json'})}).pipe(catchError((err:any)=>this.handleErrorPromise(err)));
 }

 public deleteVideo(id:any){
   return this.httpclient.delete(this.api+'/video/'+id, {headers: new HttpHeaders({'Content-Type':  'application/json'})}).pipe(catchError((err:any)=>this.handleErrorPromise(err)));
 }

  setLoggedinStatus(isLoggedIn: string): void {
     this.isLoggedInValue = isLoggedIn;
  }

  getLoggedinStatus(){
      return this.isLoggedInValue;
  }

}
  
 