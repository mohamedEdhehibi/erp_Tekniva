import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Speciality } from '../models/speciality';
import { Observable } from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class SpecialiteService {
  private Api = environment.apiNode;

  constructor(private http: HttpClient) { }

  ///////////////////   Create New Speciality ///////////////////
  createSpecialite(speciality: any): Observable<any> {
    console.log(speciality);
    
    return this.http.post<any>(`${this.Api}/employee/speciality`, speciality);
  }

  ///////////////////   All Employés ///////////////////
  getAllSpeciality(): Observable<Speciality[]> {
   
    
    return this.http.get<Speciality[]>(`${this.Api}/employee/speciality`)
  }

  ///////////////////   Speciality by ID ///////////////////
  getSpecialityByID(id: string): Observable<Speciality> {
    return this.http.get<Speciality>(`${this.Api}/employee/speciality/${id}`)
  }
 
  ///////////////////   Update ///////////////////
  UpdateSpeciality(id: string, data: any): Observable<any> {
    return this.http.patch<any>(`${this.Api}/employee/speciality/${id}`, data)
  }

  ///////////////////   Delete ///////////////////
  deleteSpeciality(id: string): Observable<any> {
   
    
    return this.http.delete<any>(`${this.Api}/employee/speciality/${id}`)
  }
}
