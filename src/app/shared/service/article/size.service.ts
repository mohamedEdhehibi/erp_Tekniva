import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { Size } from '../../models/article/size';
@Injectable({
  providedIn: 'root'
})
export class SizeService {
  private Api = environment.apiNode;

  constructor(private http: HttpClient) { }

  ///////////////////   Create New Sub-Family Article ///////////////////
  createSize(article: any): Observable<any> {
    delete article.id 
    return this.http.post<any>(`${this.Api}/article/size`, article);
  }

  ///////////////////   All Sub-Family Articles ///////////////////
  getAllSize(): Observable<Size[]> {
    return this.http.get<Size[]>(`${this.Api}/article/size`)
  }

  ///////////////////  Family Sub-Article by ID ///////////////////
  getSizeByID(id: string): Observable<Size> {
    return this.http.get<Size>(`${this.Api}/article/size/${id}`)
  }

  ///////////////////   Update ///////////////////
  UpdateSize(id: string, data: any): Observable<any> {
    return this.http.patch<any>(`${this.Api}/article/size/${id}`, data)
  }

  ///////////////////   Delete ///////////////////
  deleteSize(id: string): Observable<any> {  
    return this.http.delete<any>(`${this.Api}/article/size/${id}`)
  }
}