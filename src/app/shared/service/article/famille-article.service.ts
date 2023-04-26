import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FamilleArticle } from '../../models/article/familleArticle';
import { Observable } from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class FamilleArticleService {
  private Api = environment.apiNode;

  constructor(private http: HttpClient) { }
////////////// Get All familles articles fake API///////////////

getAllFakeFarticles() {
 
  return this.http.get<any>('assets/demo/data/famille-article.json')
    .toPromise()
    .then(res => res.data as FamilleArticle[])
    .then(data => data);   
}

///////////////////////////////////////////Api Backend/////////////////////////////////////////////////////////////

  ///////////////////   Create New Family Article ///////////////////
  createFamArticle(article: any): Observable<any> {
    return this.http.post<any>(`${this.Api}/article/family_article`, article);
  }

  ///////////////////   All Family Articles ///////////////////
  getAllFamArticles(): Observable<FamilleArticle[]> {
    return this.http.get<FamilleArticle[]>(`${this.Api}/article/family_article`)
  }

  ///////////////////  Family Article by ID ///////////////////
  getFamArticleByID(id: string): Observable<FamilleArticle> {
    return this.http.get<FamilleArticle>(`${this.Api}/article/family_article/${id}`)
  }

  ///////////////////   Update ///////////////////
  UpdateFamArticle(id: string, data: any): Observable<any> {
    return this.http.patch<any>(`${this.Api}/article/family_article/${id}`, data)
  }

  ///////////////////   Delete ///////////////////
  deleteFamArticle(id: string): Observable<any> {  
    return this.http.delete<any>(`${this.Api}/article/family_article/${id}`)
  }
}