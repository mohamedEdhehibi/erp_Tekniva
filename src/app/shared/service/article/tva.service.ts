import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { Tva } from '../../models/article/tva';
@Injectable({
  providedIn: 'root'
})
export class TvaService {

  private Api = environment.apiNode;

  constructor(private http: HttpClient) { }

///////////////////////////////////////////Api Backend/////////////////////////////////////////////////////////////

  ///////////////////   Create New Sub-Family Article ///////////////////
  createTVA(tva: any): Observable<any> {
    return this.http.post<any>(`${this.Api}/article/tva`, tva);
  }
  
  ///////////////////   All Sub-Family Articles ///////////////////
  getAllTVA(): Observable<Tva[]> {
    return this.http.get<Tva[]>(`${this.Api}/article/tva`)
  }

  ///////////////////  Family Sub-Article by ID ///////////////////
  getTVAByID(id: string): Observable<Tva> {
    return this.http.get<Tva>(`${this.Api}/article/tva/${id}`)
  }

  ///////////////////   Update ///////////////////
  UpdateTVA(id: string, data: any): Observable<any> {
    return this.http.patch<any>(`${this.Api}/article/tva/${id}`, data)
  }

  ///////////////////   Delete ///////////////////
  deleteTVA(id: string): Observable<any> {  
    return this.http.delete<any>(`${this.Api}/article/tva/${id}`)
  }
}
