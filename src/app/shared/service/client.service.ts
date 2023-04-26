import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Client } from '../models/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService{
  private Api = environment.apiNode;

  constructor(private http: HttpClient) { }



////////////////////////////////////////////creation client//////////////////////////////////////////////////////////
createClient(client: Client): Observable<any> {
  return this.http.post<any>(`${this.Api}/client/client`, client);
}

///////////////////   get all client ///////////////////
getAllClient(): Observable<Client[]> {
  return this.http.get<Client[]>(`${this.Api}/client/client`)
}

///////////////////   Client by ID ///////////////////
getClientByID(id: string): Observable<Client> {
  return this.http.get<Client>(`${this.Api}/client/client/${id}`)
}

///////////////////   Update ///////////////////
UpdateClient(id: string, data: any): Observable<any> {
  return this.http.patch<any>(`${this.Api}/client/client/${id}`, data)
}

///////////////////   Delete ///////////////////
deleteClient(id: string): Observable<any> {
  return this.http.delete<any>(`${this.Api}/client/client/${id}`)
}
}
