import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Training } from '../models/training';
import { Observable } from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  private Api = environment.apiNode;

  constructor(private http: HttpClient) { }

  ///////////////////   Create New Training///////////////////
  createTraining(training: any): Observable<any> {

    
    return this.http.post<any>(`${this.Api}/employee/training`, training);
  }

  ///////////////////   All Trainings ///////////////////
  getAllTraining(): Observable<Training[]> {
   
    return this.http.get<Training[]>(`${this.Api}/employee/training`)
  }
 
  
  ///////////////////   Training by ID ///////////////////
  getTrainingByID(id: string): Observable<Training> {
    return this.http.get<Training>(`${this.Api}/employee/training/${id}`)
  }
 
  ///////////////////   Update ///////////////////
  UpdateTraining(id: string, data: any): Observable<any> {
    console.log("service:",data,id);
    
    return this.http.patch<any>(`${this.Api}/employee/training/${id}`, data)
  }
 

  ///////////////////   Delete ///////////////////
  deleteTraining(id: string): Observable<any> {
  
   
    return this.http.delete<any>(`${this.Api}/employee/training/${id}`)
  }
}
