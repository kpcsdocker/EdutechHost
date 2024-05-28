import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import {catchError, retry} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EdutechService {

  private student: string="student";
  private mail: string = "api";
  private mongo: string = "mongo";
  private postgres: string = "postgres";
  private auth: string = "auth"; 
  private oauth2 = '/oauth2/authorization/google';
  private isLoggedInValue: string ="";
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
    return this.httpclient.get(this.mail+'/sendVerificationCode/'+email, {responseType: 'text'});
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
  
  verifyCode(email: string, code: string) {
    console.log(email,code);
    return this.httpclient.get(this.mail+'/verifyCode/'+email+'/'+code, { responseType: 'text' });
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

  clearToken(): void {
    localStorage.removeItem('authToken');
  }
}
  
 