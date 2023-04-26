import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BillingAddress } from '../models/billingAddress';


@Injectable({
  providedIn: 'root'
})
export class BillingAddressService {
  private Api = environment.apiNode;

  constructor(private http: HttpClient) { }

////////////////////////////////////////////creation billing_address//////////////////////////////////////////////////////////
createbilling_address(billing_address: BillingAddress): Observable<any> {
  return this.http.post<any>(`${this.Api}/client/billing_address`, billing_address);
}

///////////////////   get all billing_address ///////////////////
getAllbilling_address(): Observable<BillingAddress[]> {
  return this.http.get<BillingAddress[]>(`${this.Api}/client/billing_address`)
}

///////////////////   billing_address by ID ///////////////////
getbilling_addressByID(id: string): Observable<BillingAddress> {
  return this.http.get<BillingAddress>(`${this.Api}/client/billing_address/${id}`)
}

///////////////////   Update ///////////////////
Updatebilling_address(id: string, data: any): Observable<any> {
  return this.http.patch<any>(`${this.Api}/client/billing_address/${id}`, data)
}

///////////////////   Delete ///////////////////
deletebilling_address(id: string): Observable<any> {
  return this.http.delete<any>(`${this.Api}/client/billing_address/${id}`)
}
}
