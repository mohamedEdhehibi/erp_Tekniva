import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Filiere } from '../models/filiere';

@Injectable({
  providedIn: 'root'
})
export class FiliereService  {

  private Api = environment.apiNode;

  constructor(private http: HttpClient) { }
  createfiliere(filiere: Filiere): Observable<any> {
     
       delete filiere.id;
      return this.http.post<any>(`${this.Api}/company/filiere`, filiere);
  }
  getfilieres() {
      return this.http.get<Filiere[]>(`${this.Api}/company/filiere`)
         
  }
///////////////////   Filiere by ID ///////////////////
getfiliereByID(id: string): Observable<any> {
  console.log(id);
  
  return this.http.get<any>(`${this.Api}/company/filiere/${id}`)
}

///////////////////   Update ///////////////////
Updatefiliere(id: string, data: Filiere): Observable<Filiere> {

  console.log('service', data);
  
  return this.http.patch<Filiere>(`${this.Api}/company/filiere/${id}`, data)
}
///////////////////   Delete ///////////////////
deletefiliere(id: string): Observable<Filiere> {
  console.log(id);
    return this.http.delete<Filiere>(`${this.Api}/company/filiere/${id}`)
}

}