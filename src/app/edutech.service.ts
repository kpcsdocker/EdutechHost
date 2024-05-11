import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import {catchError, retry} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EdutechService {
  private student: string="student";
  userName!: string;
  email!: string;
  constructor(private httpclient: HttpClient) { }

  public getStudents(){
    return this.httpclient.get(this.student, {headers: new HttpHeaders({'Content-Type':  'application/json'})}).pipe(catchError((err:any)=>this.handleErrorPromise(err)));
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

 public setUserName(userName:any){
  console.log(this.userName);
  this.userName=userName;
}

public getUserName(){
  return this.userName;
}

public setEmail(email:any){
  console.log(this.email);
  this.email=email;
}

public getEmail(){
  return this.email;
}
}
