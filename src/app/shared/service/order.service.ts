import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private Api = environment.apiNode;

  constructor(private http: HttpClient) { }



////////////////////////////////////////////creation client//////////////////////////////////////////////////////////
createOrder(order: Order): Observable<any> {
  return this.http.post<any>(`${this.Api}/client/order`, order);
}

///////////////////   get all Order ///////////////////
getAllOrder(): Observable<Order[]> {
  return this.http.get<Order[]>(`${this.Api}/client/order`)
}

///////////////////   Order by ID ///////////////////
getOrderByID(id: string): Observable<Order> {
  return this.http.get<Order>(`${this.Api}/client/order/${id}`)
}

///////////////////   Update ///////////////////
UpdateOrder(id: string, data: any): Observable<any> {
  return this.http.patch<any>(`${this.Api}/client/order/${id}`, data)
}

///////////////////   Delete ///////////////////
deleteOrder(id: string): Observable<any> {
  return this.http.delete<any>(`${this.Api}/client/order/${id}`)
}
}
