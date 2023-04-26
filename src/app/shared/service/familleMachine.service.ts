import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FamilleMachine } from '../models/familleMachine';
import { Observable } from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class FamillesMachineService {
  private Api = environment.apiNode;

  constructor(private http: HttpClient) { }
////////////// Get All familles machines fake API///////////////

getAllFakeFamilleMachine() {
  return this.http.get<any>('assets/demo/data/famille-machine.json')
    .toPromise()
    .then(res => res.data as FamilleMachine[])
    .then(data => data);
   
    
}
//////// Get ALL famille machines ////////
getAllfamille():Observable<FamilleMachine[]>{
  return this.http.get<FamilleMachine[]>(`${this.Api}/machine/machine_family`)
}
////// add famille  machine //////
AddFamille(data : FamilleMachine):Observable<any>{
  return this.http.post<any>(`${this.Api}/machine/machine_family`,data)
}
///// update famille machine ///
updateFamille(data:FamilleMachine, id :string):Observable<any>{
  return this.http.patch<any>(`${this.Api}/machine/machine_family/${id}`,data)
}
////// delete famille //////
DeleteFamille( id :string):Observable<any>{
  return this.http.delete<any>(`${this.Api}/machine/machine_family/${id}`)
}
//// get by id ////
getFamilleById( id :string):Observable<FamilleMachine>{
  return this.http.delete<FamilleMachine>(`${this.Api}/machine/machine_family/${id}`)
}
}