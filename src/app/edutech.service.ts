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
  private users: string = "users";
  password!: string;
  email!: string;
  
  constructor(private httpclient: HttpClient) { }

  public getStudents(){
    return this.httpclient.get(this.student, {headers: new HttpHeaders({'Content-Type':  'application/json'})}).pipe(catchError((err:any)=>this.handleErrorPromise(err)));
  }

  public getUsers(){
    return this.httpclient.get(this.users, {headers: new HttpHeaders({'Content-Type':  'application/json'})}).pipe(catchError((err:any)=>this.handleErrorPromise(err)));
  }

  public getUsersById(){
    return this.httpclient.get(this.users+'/123e4567-e89b-12d3-a456-42661417400', {headers: new HttpHeaders({'Content-Type':  'application/json'})}).pipe(catchError((err:any)=>this.handleErrorPromise(err)));
  }

  public imageSubmit(studentData:FormData){
    console.log(studentData);
    return this.httpclient.post(this.student+'/register', studentData, { observe: 'response' })
    .pipe(
      catchError((err:any)=>this.handleErrorPromise(err))
    );
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

verifyCode(email: string, code: string) {
  return this.httpclient.get(this.mail+'/verifyCode/'+email+'/'+code, { responseType: 'text' });
}
}
