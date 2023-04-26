import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OrderCategory } from '../models/orderCategory';

@Injectable({
  providedIn: 'root'
})
export class OrderCategoryService {
  private Api = environment.apiNode;

  constructor(private http: HttpClient) { }

////////////////////////////////////////////creation orderCategory//////////////////////////////////////////////////////////
createorderCategory(orderCategory: OrderCategory): Observable<any> {
  return this.http.post<any>(`${this.Api}/client/order_category`, orderCategory);
}

///////////////////   get all orderCategory ///////////////////
getAllorderCategory(): Observable<OrderCategory[]> {
  return this.http.get<OrderCategory[]>(`${this.Api}/client/order_category`)
}

///////////////////   orderCategory by ID ///////////////////
getorderCategoryByID(id: string): Observable<OrderCategory> {
  return this.http.get<OrderCategory>(`${this.Api}/client/order_category/${id}`)
}

///////////////////   Update ///////////////////
UpdateorderCategory(id: string, data: any): Observable<any> {
  return this.http.patch<any>(`${this.Api}/client/order_category/${id}`, data)
}

///////////////////   Delete ///////////////////
deleteorderCategory(id: string): Observable<any> {
  return this.http.delete<any>(`${this.Api}/client/order_category/${id}`)
}
}
