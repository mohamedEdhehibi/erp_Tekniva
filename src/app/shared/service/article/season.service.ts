import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Season } from '../../models/article/season';
@Injectable({
  providedIn: 'root'
})
export class SeasonService {
  private Api = environment.apiNode;

  constructor(private http: HttpClient) { }

  ///////////////////   Create New Sub-Family Article ///////////////////
  createSeason(article: any): Observable<any> {
    delete article.id 
    return this.http.post<any>(`${this.Api}/article/season`, article);
  }

  ///////////////////   All Sub-Family Articles ///////////////////
  getAllSeasons(): Observable<Season[]> {
    return this.http.get<Season[]>(`${this.Api}/article/season`)
  }

  ///////////////////  Family Sub-Article by ID ///////////////////
  getSeasonByID(id: string): Observable<Season> {
    return this.http.get<Season>(`${this.Api}/article/season/${id}`)
  }

  ///////////////////   Update ///////////////////
  UpdateSeason(id: string, data: any): Observable<any> {
    return this.http.patch<any>(`${this.Api}/article/season/${id}`, data)
  }

  ///////////////////   Delete ///////////////////
  deleteSeason(id: string): Observable<any> {  
    return this.http.delete<any>(`${this.Api}/article/season/${id}`)
  }
}