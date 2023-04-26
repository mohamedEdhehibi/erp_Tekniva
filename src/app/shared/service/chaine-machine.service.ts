import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MachineChaine } from '../models/machine-chaine';

@Injectable({
  providedIn: 'root'
})
export class ChaineMachineService {

  constructor(private http:HttpClient) { }
   private Api = environment.apiNode;
//   //////// Get ALL Chainemachines ////////
getAllChaineMachine():Observable<any[]>{
 
  return this.http.get<any[]>(`${this.Api}/chaine/chaine_machine`)
}
// /////////// get by id ////////
getbyidChaineMachine(id:string):Observable<MachineChaine>{
  return this.http.get<MachineChaine>(`${this.Api}/chaine/chaine_machine/${id}`)
}
// ////// add Chaine machine //////
addChaineMachine(data : MachineChaine):Observable<any>{
  delete data.id
  console.log('machine service',data);
  
  return this.http.post<any>(`${this.Api}/chaine/chaine_machine/`,data)
}
// ////////// update 
updateChaineMachine(data : MachineChaine,id:any):Observable<any>{
  return this.http.patch<any>(`${this.Api}/chaine/chaine_machine/${id}`,data)
}
deleteChaineMachine(id : string):Observable<any>{
  return this.http.delete<any>(`${this.Api}/chaine/chaine_machine/${id}`)
}
}
