import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from "rxjs";
import { User } from 'src/app/shared/models/user';

const httpOptions= {
  headers: new HttpHeaders({
    'Content-Type':  'application/x-www-form-urlencoded'
  })
};
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private Api = environment.apiNode;
  token: string='';
  constructor(private http: HttpClient) {
   
   }
  
  ///////////////////   Register ///////////////////
  
  register(user: any): Observable<User> {
    return this.http.post<User>(`${this.Api}/auth/register`, user);
  }

  ///////////////////   Login ///////////////////

  login(email:string,password:string): Observable<User> {
    const body={email:email,password:password}
    return this.http.post<User>(`${this.Api}/auth/login`, body,{ withCredentials: true });
  }
  getToken(): any {
    return localStorage.getItem('access_token');
  }

  clearToken() {
    localStorage.removeItem(this.token);
  }

}
