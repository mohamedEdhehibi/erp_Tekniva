import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Job } from '../models/Employee-job';
import { Observable } from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class JobService {
  private Api = environment.apiNode;

  constructor(private http: HttpClient) { }

  ///////////////////   Create New job ///////////////////
  createJob(job: any): Observable<any> {
    return this.http.post<any>(`${this.Api}/employee/job`, job);
  }
  
  ///////////////////   All job ///////////////////
  getAllJob(): Observable<Job[]> {
    return this.http.get<Job[]>(`${this.Api}/employee/job`)
  }

  ///////////////////   Job by ID ///////////////////
  getJobByID(id: string): Observable<Job> {
    return this.http.get<Job>(`${this.Api}/employee/job/${id}`)
  }
 
  ///////////////////   Update ///////////////////
  updateJob(id: string, data: any): Observable<any> {
    return this.http.patch<any>(`${this.Api}/employee/job/${id}`, data)
  }

  ///////////////////   Delete ///////////////////
  deleteJob(id: string): Observable<any> {
  return this.http.delete<any>(`${this.Api}/employee/job/${id}`)
  }
}
