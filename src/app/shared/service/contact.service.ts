import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Contact } from '../models/contact';


@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private Api = environment.apiNode;

  constructor(private http: HttpClient) { }

////////////////////////////////////////////creation contact//////////////////////////////////////////////////////////
createcontact(contact: Contact): Observable<any> {
  return this.http.post<any>(`${this.Api}/client/contact`, contact);
}

///////////////////   get all contact ///////////////////
getAllcontact(): Observable<Contact[]> {
  return this.http.get<Contact[]>(`${this.Api}/client/contact`)
}

///////////////////   contact by ID ///////////////////
getcontactByID(id: string): Observable<Contact> {
  return this.http.get<Contact>(`${this.Api}/client/contact/${id}`)
}

///////////////////   Update ///////////////////
Updatecontact(id: string, data: any): Observable<any> {
  return this.http.patch<any>(`${this.Api}/client/contact/${id}`, data)
}

///////////////////   Delete ///////////////////
deletecontact(id: string): Observable<any> {
  return this.http.delete<any>(`${this.Api}/client/contact/${id}`)
}
}
