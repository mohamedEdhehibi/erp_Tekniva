import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Order } from '../models/order';
import { PaymentMethod } from '../models/paymentMethod';

@Injectable({
  providedIn: 'root'
})
export class PaymentMethodService {
  private Api = environment.apiNode;

  constructor(private http: HttpClient) { }
////////////////////////////////////////////creation payment_method//////////////////////////////////////////////////////////
createpayment_method(payment_method: PaymentMethod): Observable<any> {
  return this.http.post<any>(`${this.Api}/client/payment_method`, payment_method);
}

///////////////////   get all payment_method ///////////////////
getAllpayment_method(): Observable<PaymentMethod[]> {
  return this.http.get<PaymentMethod[]>(`${this.Api}/client/payment_method`)
}

///////////////////   payment_method by ID ///////////////////
getpayment_methodByID(id: string): Observable<PaymentMethod> {
  return this.http.get<PaymentMethod>(`${this.Api}/client/payment_method/${id}`)
}

///////////////////   Update ///////////////////
Updatepayment_method(id: string, data: any): Observable<PaymentMethod> {
  return this.http.patch<any>(`${this.Api}/client/payment_method/${id}`, data)
}

///////////////////   Delete ///////////////////
deletepayment_method(id: string): Observable<PaymentMethod> {
  return this.http.delete<any>(`${this.Api}/client/payment_method/${id}`)
}
}
