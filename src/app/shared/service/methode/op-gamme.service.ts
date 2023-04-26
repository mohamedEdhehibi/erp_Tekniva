import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { OPGamme } from '../../models/methode/op-gamme';
@Injectable({
  providedIn: 'root'
})
export class OPGammeService {

  private Api = environment.apiNode;

  constructor(private http: HttpClient) { }

////////////// Get All familles machines fake API///////////////

getAllFakeFamilleMachine() {
  return this.http.get<any>('assets/demo/data/famille-machine.json')
    .toPromise()
    .then(res => res.data as OPGamme[])
    .then(data => data);
   
    
}
}
