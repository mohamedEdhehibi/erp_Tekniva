import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Machine } from '../models/machine';
import { Observable } from "rxjs";
import { FamilleMachine } from '../models/familleMachine';
@Injectable({
  providedIn: 'root'
})
export class MachineService {
  private Api = environment.apiNode;

  constructor(private http: HttpClient) { }
////////////// Get All machines fake API///////////////

getAllFakeMachine() {  
  return this.http.get<any>('assets/demo/data/machine.json')
    .toPromise()
    .then(res => res.data as Machine[])
    .then(data => data);  
}
//////// Get ALL machines ////////
getAllMachine():Observable<any[]>{
  return this.http.get<any[]>(`${this.Api}/machine/machine`)
}
/////////// get by id ////////
getbyidMachine(id:string):Observable<Machine>{
  return this.http.get<Machine>(`${this.Api}/machine/machine/${id}`)
}
////// add machine //////
AddMachine(data : Machine):Observable<any>{
  delete data.id
  console.log('machine service',data);
  
  return this.http.post<any>(`${this.Api}/machine/machine`,data)
}
////////// update 
updateMachine(data : Machine,id:any):Observable<any>{
  return this.http.patch<any>(`${this.Api}/machine/machine/${id}`,data)
}
deleteMachine(id : string):Observable<any>{
  return this.http.delete<any>(`${this.Api}/machine/machine/${id}`)
}
}