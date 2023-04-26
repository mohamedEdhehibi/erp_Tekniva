import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { Observable } from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private Api = environment.apiNode;

  constructor(private http: HttpClient) { }
  ///////////////////   Create New User ///////////////////
  createUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.Api}/auth/register`, user);
  }

  ///////////////////   All Users ///////////////////
  getAllUser(): Observable<User[]> {
    return this.http.get<User[]>(`${this.Api}/user/user`)
  }

  ///////////////////   User by ID ///////////////////
  getUserByID(id: string): Observable<User> {
    return this.http.get<User>(`${this.Api}/user/user/${id}`)
  }

  ///////////////////   Update ///////////////////
  UpdateUser(id: string, data: any): Observable<any> {
    delete data.id
    return this.http.patch<any>(`${this.Api}/user/user/${id}`, data)
  }

  ///////////////////   Delete ///////////////////
  deleteUser(id: string): Observable<any> {
    return this.http.delete<any>(`${this.Api}/user/user/${id}`)
  }
}
