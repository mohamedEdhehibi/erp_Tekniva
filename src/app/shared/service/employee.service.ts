import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Employee } from '../models/Employee';
import { Observable } from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class EmployésService {
  private Api = environment.apiNode;

  constructor(private http: HttpClient) { }
////////////// Get All employee fake API///////////////

getAllFakeEmployee() {
  console.log();
  
  return this.http.get<any>('assets/demo/data/employee.json')
    .toPromise()
    .then(res => res.data as Employee[])
    .then(data => data);
   
    
}

  ///////////////////   Create New Employee ///////////////////
  createEmploye(employee: any): Observable<any> {
    console.log(employee);
    
    return this.http.post<any>(`${this.Api}/employee/employee`, employee);
  }

  ///////////////////   All Employés ///////////////////
  getAllEmployees(): Observable<Employee[]> {
   
    
    return this.http.get<Employee[]>(`${this.Api}/employee/employee`)
  }

  ///////////////////   Employee by ID ///////////////////
  getEmployeeByID(id: string): Observable<Employee> {
    return this.http.get<Employee>(`${this.Api}/employee/employee/${id}`)
  }
 
  ///////////////////   Update ///////////////////
  UpdateEmployee(id: string, data: any): Observable<any> {
    return this.http.patch<any>(`${this.Api}/employee/employee/${id}`, data)
  }

  ///////////////////   Delete ///////////////////
  deleteEmployee(id: string): Observable<any> {
   
    
    return this.http.delete<any>(`${this.Api}/employee/employee/${id}`)
  }
}
