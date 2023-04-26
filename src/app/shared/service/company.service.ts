import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Company } from '../models/company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService  {

  
  private Api = environment.apiNode;

  constructor(private http: HttpClient) { }
  createcompany(company: Company): Observable<any> {
     
       delete company.id;
      return this.http.post<any>(`${this.Api}/company/company`, company);
  }


  getcompanys() {
      return this.http.get<Company[]>(`${this.Api}/company/company`)
         
  }
///////////////////   User by ID ///////////////////
getcompanyByID(id: string): Observable<any> {
  console.log(id);
  
  return this.http.get<any>(`${this.Api}/company/company/${id}`)
}

///////////////////   Update ///////////////////
Updatecompany(id: string, data: Company): Observable<Company> {

  console.log('service', data);
  
  return this.http.patch<Company>(`${this.Api}/company/company/${id}`, data)
}

///////////////////   Delete ///////////////////
deletecompany(id: string): Observable<Company> {
  console.log(id);
  
  return this.http.delete<Company>(`${this.Api}/company/company/${id}`)
}

}

