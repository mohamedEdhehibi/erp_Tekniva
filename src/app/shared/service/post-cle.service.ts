import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PostCle } from '../models/post-cle';

@Injectable({
  providedIn: 'root'
})
export class PostCleService  {
  private Api = environment.apiNode;
  constructor(private http: HttpClient) { }
  createpost_cle(post_cle: PostCle): Observable<any> {
     
       delete post_cle.id;
      return this.http.post<any>(`${this.Api}/chaine/postCle`, post_cle);
  }
  getpost_cles() {
      return this.http.get<PostCle[]>(`${this.Api}/chaine/postCle`)
         
  }
///////////////////   post_cle by ID ///////////////////
getpost_cleByID(id: string): Observable<any> {
  console.log(id);
  
  return this.http.get<any>(`${this.Api}/chaine/postCle/${id}`)
}

///////////////////   Update ///////////////////
Updatepost_cle(id: string, data: PostCle): Observable<PostCle> {

  console.log('service', data);
  
  return this.http.patch<PostCle>(`${this.Api}/chaine/postCle/${id}`, data)
}
///////////////////   Delete ///////////////////
deletepost_cle(id: string): Observable<PostCle> {
  console.log(id);
    return this.http.delete<PostCle>(`${this.Api}/chaine/postCle/${id}`)
}
 }