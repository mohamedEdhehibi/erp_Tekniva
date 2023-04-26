import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


import { groupeChaine } from '../models/groupe_chaine';

@Injectable({
    providedIn: 'root',
})
export class GroupeChaineService {

  
    private Api = environment.apiNode;

    constructor(private http: HttpClient) { }
    creategroupeChaine(groupeChaine: groupeChaine): Observable<any> {
       
         delete groupeChaine.id;
        return this.http.post<any>(`${this.Api}/chaine/groupe_chaine`, groupeChaine);
    }


    getGroupe_Chaines() {
        return this.http.get<groupeChaine[]>(`${this.Api}/chaine/groupe_chaine`)
           
    }
  ///////////////////   User by ID ///////////////////
  getGroupe_ChaineByID(id: string): Observable<any> {
    console.log(id);
    
    return this.http.get<any>(`${this.Api}/chaine/groupe_chaine/${id}`)
  }

  ///////////////////   Update ///////////////////
  UpdateGroupe_Chaine(id: string, data: groupeChaine): Observable<groupeChaine> {

    console.log('service', data);
    
    return this.http.patch<groupeChaine>(`${this.Api}/chaine/groupe_chaine/${id}`, data)
  }

  ///////////////////   Delete ///////////////////
  deleteGroupe_Chaine(id: string): Observable<groupeChaine> {
    console.log(id);
    
    return this.http.delete<groupeChaine>(`${this.Api}/chaine/groupe_chaine/${id}`)
  }

}
