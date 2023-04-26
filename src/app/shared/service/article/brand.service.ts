import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Brand } from '../../models/article/brand';
@Injectable({
  providedIn: 'root'
})
export class BrandService {
  private Api = environment.apiNode;

  constructor(private http: HttpClient) { }

  ///////////////////   Create Brand ///////////////////
  createBrand(article: any): Observable<any> {
    delete article.id 
    return this.http.post<any>(`${this.Api}/article/brand`, article);
  }

  ///////////////////   All Brand ///////////////////
  getAllBrands(): Observable<Brand[]> {
    return this.http.get<Brand[]>(`${this.Api}/article/brand`)
  }

  ///////////////////  Brand by ID ///////////////////
  getBrandByID(id: string): Observable<Brand> {
    return this.http.get<Brand>(`${this.Api}/article/brand/${id}`)
  }

  ///////////////////   Update ///////////////////
  UpdateBrand(id: string, data: any): Observable<any> {
    return this.http.patch<any>(`${this.Api}/article/brand/${id}`, data)
  }

  ///////////////////   Delete ///////////////////
  deleteBrand(id: string): Observable<any> {  
    return this.http.delete<any>(`${this.Api}/article/brand/${id}`)
  }
}