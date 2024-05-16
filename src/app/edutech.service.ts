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
  password!: string;
  email!: string;
  code!: string;
  
  constructor(private httpclient: HttpClient) { }

  public getStudents(){
    return this.httpclient.get(this.postgres+'/students', {headers: new HttpHeaders({'Content-Type':  'application/json'})}).pipe(catchError((err:any)=>this.handleErrorPromise(err)));
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

verifyCode(email: string, code: string) {
  return this.httpclient.get(this.mail+'/verifyCode/'+email+'/'+code, { responseType: 'text' });
}

public setVerificationEmail(email:any){
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

}
