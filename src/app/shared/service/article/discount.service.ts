import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Discount } from '../../models/article/discount';
@Injectable({
  providedIn: 'root'
})
export class DiscountService {
  private Api = environment.apiNode;

  constructor(private http: HttpClient) { }

  ///////////////////   Create discount ///////////////////
  createDiscount(discount: any): Observable<any> {
    delete discount.id 
    return this.http.post<any>(`${this.Api}/article/discount`, discount);
  }

  ///////////////////   All discount ///////////////////
  getAllDiscounts(): Observable<Discount[]> {
    return this.http.get<Discount[]>(`${this.Api}/article/discount`)
  }

  ///////////////////  discount by ID ///////////////////
  getDiscountByID(id: string): Observable<Discount> {
    return this.http.get<Discount>(`${this.Api}/article/discount/${id}`)
  }

  ///////////////////   Update ///////////////////
  UpdateDiscount(id: string, data: any): Observable<any> {
    return this.http.patch<any>(`${this.Api}/article/discount/${id}`, data)
  }

  ///////////////////   Delete ///////////////////
  deleteDiscount(id: string): Observable<any> {  
    return this.http.delete<any>(`${this.Api}/article/discount/${id}`)
  }
}