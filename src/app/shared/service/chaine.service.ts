import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Chaine } from 'src/app/shared/models/chaine';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ChaineService {
    private Api = environment.apiNode;

    constructor(private http: HttpClient) { }
    createChaine(chaine: Chaine): Observable<Chaine> {
        console.log(chaine,"mohamed");
         delete chaine.id
        return this.http.post<Chaine>(`${this.Api}/chaine/chaine`, chaine);
      }

 
  ///////////////////   All chaine ///////////////////
  getChaines(): Observable<Chaine[]> {
    return this.http.get<Chaine[]>(`${this.Api}/chaine/chaine`)
  }
    //////////////////  Chaine by ID ///////////////////
getChaineByID(id: string): Observable<any> {
    console.log(id);
    
    return this.http.get<any>(`${this.Api}/chaine/chaine/${id}`)
  }
  
  ///////////////////   Update ///////////////////
  UpdateChaine(id: string, data: Chaine): Observable<Chaine> {
  
    console.log('service', data);
    
    return this.http.patch<Chaine>(`${this.Api}/chaine/chaine/${id}`, data)
  }
  
  ///////////////////   Delete ///////////////////
  deleteChaine(id: string): Observable<Chaine> {
    console.log(id);
    
    return this.http.delete<Chaine>(`${this.Api}/chaine/chaine/${id}`)
  }

}
    