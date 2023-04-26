
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Color } from '../../models/article/color';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  private Api = environment.apiNode;

  constructor(private http: HttpClient) { }


  ///////////////////   Create Color ///////////////////
  createColor(color: any): Observable<any> {
    delete color.id 
    return this.http.post<any>(`${this.Api}/article/color`, color);
  }

  ///////////////////   All Color ///////////////////
  getAllColors(): Observable<Color[]> {
    return this.http.get<Color[]>(`${this.Api}/article/color`)
  }

  ///////////////////  Color by ID ///////////////////
  getColorByID(id: string): Observable<Color> {
    return this.http.get<Color>(`${this.Api}/article/color/${id}`)
  }

  ///////////////////   Update ///////////////////
  UpdateColor(id: string, data: any): Observable<any> {
    return this.http.patch<any>(`${this.Api}/article/color/${id}`, data)
  }

  ///////////////////   Delete ///////////////////
  deleteColor(id: string): Observable<any> {  
    return this.http.delete<any>(`${this.Api}/article/color/${id}`)
  }
}

