import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Model } from '../../models/article/model';
@Injectable({
  providedIn: 'root'
})
export class ModelService {
  private Api = environment.apiNode;

  constructor(private http: HttpClient) { }

  ///////////////////   Create Model ///////////////////
  createModel(model: any): Observable<any> {
    delete model.id 
    return this.http.post<any>(`${this.Api}/article/model`, model);
  }

  ///////////////////   All Model ///////////////////
  getAllModels(): Observable<Model[]> {
    return this.http.get<Model[]>(`${this.Api}/article/model`)
  }

  ///////////////////  Model by ID ///////////////////
  getModelByID(id: number): Observable<Model> {
    return this.http.get<Model>(`${this.Api}/article/model/${id}`)
  }

  ///////////////////   Update ///////////////////
  UpdateModel(id: string, data: any): Observable<any> {
    return this.http.patch<any>(`${this.Api}/article/model/${id}`, data)
  }

  ///////////////////   Delete ///////////////////
  deleteModel(id: number): Observable<any> {    
    return this.http.delete<any>(`${this.Api}/article/model/${id}`)
  }
}