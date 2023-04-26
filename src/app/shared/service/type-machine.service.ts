import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MachineType } from '../models/machine-type';


@Injectable({
  providedIn: 'root'
})
export class TypeMachineService {
  private Api = environment.apiNode;
  constructor(private http:HttpClient) { }
  
  //////// Get ALL machines ////////
getAllTypeMachine():Observable<any[]>{
  return this.http.get<any[]>(`${this.Api}/machine/machine_type`)
 
}
/////////// get by id ////////
getbyidTypeMachine(id:string):Observable<MachineType>{
  return this.http.get<MachineType>(`${this.Api}/machine/machine_type${id}`)
}
////// add machine //////
AddTypeMachine(data : MachineType):Observable<any>{
  
  console.log('Type machine service',data);
  
  return this.http.post<any>(`${this.Api}/machine/machine_type`,data)
}
////////// update 
updateTypeMachine(data : MachineType,id:any):Observable<any>{
  return this.http.patch<any>(`${this.Api}/machine/machine_type/${id}`,data)
}
deleteTypeMachine(id : string):Observable<any>{
  return this.http.delete<any>(`${this.Api}/machine/machine_type/machinetype/${id}`)
  
}
}
