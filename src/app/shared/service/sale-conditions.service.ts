import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SaleConditions } from '../models/saleConditions';


@Injectable({
  providedIn: 'root'
})
export class SaleConditionsService  {
  private Api = environment.apiNode;

  constructor(private http: HttpClient) { }
////////////////////////////////////////////creation sale_conditions//////////////////////////////////////////////////////////
createsale_conditions(sale_conditions: SaleConditions): Observable<any> {
  return this.http.post<any>(`${this.Api}/client/sale_conditions`, sale_conditions);
}

///////////////////   get all sale_conditions ///////////////////
getAllsale_conditions(): Observable<SaleConditions[]> {
  return this.http.get<SaleConditions[]>(`${this.Api}/client/sale_conditions`)
}

///////////////////   sale_conditions by ID ///////////////////
getsale_conditionsByID(id: string): Observable<SaleConditions> {
  return this.http.get<SaleConditions>(`${this.Api}/client/sale_conditions/${id}`)
}

///////////////////   Update ///////////////////
Updatesale_conditions(id: string, data: any): Observable<SaleConditions> {
  return this.http.patch<any>(`${this.Api}/client/sale_conditions/${id}`, data)
}

///////////////////   Delete ///////////////////
deletesale_conditions(id: string): Observable<SaleConditions> {
  return this.http.delete<any>(`${this.Api}/client/sale_conditions/${id}`)
}
}