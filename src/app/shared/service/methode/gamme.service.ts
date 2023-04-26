import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Gamme } from '../../models/methode/gamme';
@Injectable({
  providedIn: 'root'
})
export class GammeService {

  private Api = environment.apiNode;

  constructor(private http: HttpClient) { }

////////////// Get All familles machines fake API///////////////

getAllGammes() {
  return this.http.get<any>('assets/demo/data/gammeJson.json')
    .toPromise()
    .then(res => res.data as Gamme[])
    .then(data => data);   
}
}
