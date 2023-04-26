import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DeliveryAddress } from '../models/deliveryAddress';


@Injectable({
  providedIn: 'root'
})
export class DeliveryAddressService  {
  private Api = environment.apiNode;

  constructor(private http: HttpClient) { }

////////////////////////////////////////////creation delivery_address//////////////////////////////////////////////////////////
createdelivery_address(delivery_address: DeliveryAddress): Observable<any> {
  return this.http.post<any>(`${this.Api}/client/delivery_address`, delivery_address);
}

///////////////////   get all delivery_address ///////////////////
getAlldelivery_address(): Observable<DeliveryAddress[]> {
  return this.http.get<DeliveryAddress[]>(`${this.Api}/client/delivery_address`)
}

///////////////////   delivery_address by ID ///////////////////
getdelivery_addressByID(id: string): Observable<DeliveryAddress> {
  return this.http.get<DeliveryAddress>(`${this.Api}/client/delivery_address/${id}`)
}

///////////////////   Update ///////////////////
Updatedelivery_address(id: string, data: any): Observable<any> {
  return this.http.patch<any>(`${this.Api}/client/delivery_address/${id}`, data)
}

///////////////////   Delete ///////////////////
deletedelivery_address(id: string): Observable<any> {
  return this.http.delete<any>(`${this.Api}/client/delivery_address/${id}`)
}
}
