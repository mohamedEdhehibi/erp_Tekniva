import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { Observable } from "rxjs";
import { Article } from '../../models/article/article';
@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private Api = environment.apiNode;

  constructor(private http: HttpClient) { }
////////////// Get All atricles fake API///////////////

getAllFakeArticles() {
 
  return this.http.get<any>('assets/demo/data/article.json')
    .toPromise()
    .then(res => res.data as Article[])
    .then(data => data);
   
    
}


///////////////////////////////////////////Api Backend/////////////////////////////////////////////////////////////

  ///////////////////   Create New Article ///////////////////
  createArticle(article: any): Observable<any> {
    return this.http.post<any>(`${this.Api}/article/article`, article);
  }

  ///////////////////   All Articles ///////////////////
  getAllArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.Api}/article/article`)
  }
  getArticlesByModel(id:string): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.Api}/article/article/articleModel/${id}`)
  }

  ///////////////////   Article by ID ///////////////////
  getArticleByID(id: number): Observable<Article> {
    return this.http.get<Article>(`${this.Api}/article/article/${id}`)
  }

  ///////////////////   Update ///////////////////
  UpdateArticle(id: number, data: any): Observable<any> {
    return this.http.patch<any>(`${this.Api}/article/article/${id}`, data)
  }

  ///////////////////   Delete ///////////////////
  deleteArticle(id: number): Observable<any> {  
    return this.http.delete<any>(`${this.Api}/article/article/${id}`)
  }
}