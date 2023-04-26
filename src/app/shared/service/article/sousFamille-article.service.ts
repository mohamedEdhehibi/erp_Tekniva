import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SousFamilleArticle } from '../../models/article/souFamille-article';
import { Observable } from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class SousFamilleArticleService {
  private Api = environment.apiNode;

  constructor(private http: HttpClient) { }

  ///////////////////   Create New Sub-Family Article ///////////////////
  createSubFamArticle(article: any): Observable<any> {
    delete article.id 
    return this.http.post<any>(`${this.Api}/article/sub_family_article`, article);
  }

  ///////////////////   All Sub-Family Articles ///////////////////
  getAllSubFamArticles(): Observable<SousFamilleArticle[]> {
    return this.http.get<SousFamilleArticle[]>(`${this.Api}/article/sub_family_article`)
  }
  ///////////////////   All Sub-Family By family Articles ///////////////////
  getAllSubFamByFamilyArticles(id:any): Observable<any> {
    return this.http.get<any>(`${this.Api}/article/sub_family_article/findByFamily/${id}`)
  
  }

  ///////////////////  Family Sub-Article by ID ///////////////////
  getSubFamArticleByID(id: string): Observable<SousFamilleArticle> {
    return this.http.get<SousFamilleArticle>(`${this.Api}/article/sub_family_article/${id}`)
  }

  ///////////////////   Update ///////////////////
  UpdateSubFamArticle(id: string, data: any): Observable<any> {
    return this.http.patch<any>(`${this.Api}/article/sub_family_article/${id}`, data)
  }

  ///////////////////   Delete ///////////////////
  deleteSubFamArticle(id: string): Observable<any> {  
    return this.http.delete<any>(`${this.Api}/article/sub_family_article/${id}`)
  }
}