import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Operation } from '../../models/methode/operation';
@Injectable({
  providedIn: 'root'
})
export class OperationService {

  private Api = environment.apiNode;

  constructor(private http: HttpClient) { }

////////////// Get All familles machines fake API///////////////

getAllOperation() {
  return this.http.get<any>('assets/demo/data/operations.json')
    .toPromise()
    .then(res => res.data as Operation[])
    .then(data => data);

}


}
