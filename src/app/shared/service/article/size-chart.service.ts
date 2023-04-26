import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SizeChart } from '../../models/article/size-chart';
@Injectable({
  providedIn: 'root'
})
export class SizeChartService {
  private Api = environment.apiNode;

  constructor(private http: HttpClient) { }

  ///////////////////   Create New Sub-Family Article ///////////////////
  createSizeChart(article: any): Observable<any> {
    delete article.id 
    return this.http.post<any>(`${this.Api}/article/size_chart`, article);
  }

  ///////////////////   All Sub-Family Articles ///////////////////
  getAllSizeCharts(): Observable<SizeChart[]> {
    return this.http.get<SizeChart[]>(`${this.Api}/article/size_chart`)
  }

  ///////////////////  Family Sub-Article by ID ///////////////////
  getSizeChartByID(id: string): Observable<SizeChart> {
    return this.http.get<SizeChart>(`${this.Api}/article/size_chart/${id}`)
  }

  ///////////////////   Update ///////////////////
  UpdateSizeChart(id: string, data: any): Observable<any> {
    return this.http.patch<any>(`${this.Api}/article/size_chart/${id}`, data)
  }

  ///////////////////   Delete ///////////////////
  deleteSizeChart(id: string): Observable<any> {  
    return this.http.delete<any>(`${this.Api}/article/size_chart/${id}`)
  }
}