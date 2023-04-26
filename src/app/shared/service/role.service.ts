import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Role } from '../models/role';
import { Observable } from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private Api = environment.apiNode;

  constructor(private http: HttpClient) { }



///////////////////////////////////////////Api Backend/////////////////////////////////////////////////////////////

  ///////////////////   Create New role ///////////////////
  createRole(role: any): Observable<any> {
    const data ={designation:role,user:[]}
    return this.http.post<any>(`${this.Api}/user/role`, data);
  }

  ///////////////////   All roles ///////////////////
  getAllRole(): Observable<Role[]> {
    return this.http.get<Role[]>(`${this.Api}/user/role`)
  }

  ///////////////////   role by ID ///////////////////
  getRoleByID(id: string): Observable<Role> {
    return this.http.get<Role>(`${this.Api}/user/role/${id}`)
  }

  ///////////////////   Update ///////////////////
  UpdateRole(id: string, data: any): Observable<any> {
    return this.http.patch<any>(`${this.Api}/user/role/${id}`, data)
  }

  ///////////////////   Delete ///////////////////
  deleteRole(id: string): Observable<any> {  
    return this.http.delete<any>(`${this.Api}/user/role/${id}`)
  }
}