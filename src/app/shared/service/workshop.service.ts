import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Workshop } from '../models/workshop';

@Injectable({
  providedIn: 'root'
})
export class WorkshopService  {

  private Api = environment.apiNode;

  constructor(private http: HttpClient) { }
  createworkshop(workshop: Workshop): Observable<any> {
     
       delete workshop.id;
      return this.http.post<any>(`${this.Api}/company/workshop`, workshop);
  }
  getworkshops() {
      return this.http.get<Workshop[]>(`${this.Api}/company/workshop`)
         
  }
///////////////////   workshop by ID ///////////////////
getworkshopByID(id: string): Observable<any> {
  console.log(id);
  
  return this.http.get<any>(`${this.Api}/company/workshop/${id}`)
}

///////////////////   Update ///////////////////
Updateworkshop(id: string, data: Workshop): Observable<Workshop> {

  console.log('service', data);
  
  return this.http.patch<Workshop>(`${this.Api}/company/workshop/${id}`, data)
}
///////////////////   Delete ///////////////////
deleteworkshop(id: string): Observable<Workshop> {
  console.log(id);
    return this.http.delete<Workshop>(`${this.Api}/company/workshop/${id}`)
}

}
