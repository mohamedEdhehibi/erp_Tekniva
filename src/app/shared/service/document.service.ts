import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Document } from '../models/document';
import { Observable } from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private Api = environment.apiNode;

  constructor(private http: HttpClient) { }

  ///////////////////   Create New DOCUMENT ///////////////////
  createDocument(document: any): Observable<any> {
    console.log(document);
    
    return this.http.post<any>(`${this.Api}/employee/document`, document);
  }

  ///////////////////   All document ///////////////////
  getAllDocument(): Observable<Document[]> {
   
    
    return this.http.get<Document[]>(`${this.Api}/employee/document`)
  }

  ///////////////////   document by ID ///////////////////
  getDocumentByID(id: string): Observable<Document> {
    return this.http.get<Document>(`${this.Api}/employee/document/${id}`)
  }
 
  ///////////////////   Update ///////////////////
  UpdateDocument(id: string, data: any): Observable<any> {
    return this.http.patch<any>(`${this.Api}/employee/document/${id}`, data)
  }

  ///////////////////   Delete ///////////////////
  deleteDocument(id: string): Observable<any> {
   
    
    return this.http.delete<any>(`${this.Api}/employee/document/${id}`)
  }
}
