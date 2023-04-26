import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Type } from '../models/type';


@Injectable({
  providedIn: 'root'
})
export class TypeService {

  private Api = environment.apiNode;
  constructor(private http:HttpClient) { }
  
  //////// Get ALL machines ////////
getAllType():Observable<any[]>{
  return this.http.get<any[]>(`${this.Api}/machine/type`)
 
}
/////////// get by id ////////
getbyidType(id:string):Observable<Type>{
  return this.http.get<Type>(`${this.Api}/machine/type${id}`)
}
////// add machine //////
AddType(data : Type):Observable<any>{
  
  console.log('Type machine service',data);
  
  return this.http.post<any>(`${this.Api}/machine/type`,data)
}
////////// update 
updateType(data : Type,id:any):Observable<any>{
  return this.http.patch<any>(`${this.Api}/machine/type/${id}`,data)
}
deleteType(id : string):Observable<any>{
  return this.http.delete<any>(`${this.Api}/machine/type/${id}`)
}
}
