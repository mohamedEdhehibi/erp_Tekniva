import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Complexity } from '../../models/article/complexity';
@Injectable({
  providedIn: 'root'
})
export class ComplexityService {
  private Api = environment.apiNode;

  constructor(private http: HttpClient) { }

  ///////////////////   Create Complexity ///////////////////
  createComplexity(article: any): Observable<any> {
    delete article.id 
    return this.http.post<any>(`${this.Api}/article/complexity`, article);
  }

  ///////////////////   All Complexity ///////////////////
  getAllComplexitys(): Observable<Complexity[]> {
    return this.http.get<Complexity[]>(`${this.Api}/article/complexity`)
  }

  ///////////////////  Complexity by ID ///////////////////
  getComplexityByID(id: string): Observable<Complexity> {
    return this.http.get<Complexity>(`${this.Api}/article/complexity/${id}`)
  }

  ///////////////////   Update ///////////////////
  UpdateComplexity(id: string, data: any): Observable<any> {
    return this.http.patch<any>(`${this.Api}/article/complexity/${id}`, data)
  }

  ///////////////////   Delete ///////////////////
  deleteComplexity(id: string): Observable<any> {  
    return this.http.delete<any>(`${this.Api}/article/complexity/${id}`)
  }
}