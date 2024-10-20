import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class WebRequestService {

  readonly ROOT_URL;
 private http= inject(HttpClient);



  constructor() {
    this.ROOT_URL = 'http://localhost:8000';
 



   }


   get(uri:string){
     return this.http.get<any[]>(`${this.ROOT_URL}/${uri}`,{
      
      headers:{
        'x-access-token': localStorage.getItem('x-access-token')||''
      }
     })

   }

   post(uri:string,payload:Object){
     return this.http.post(`${this.ROOT_URL}/${uri}`,payload,{
      headers:{
        'x-access-token': localStorage.getItem('x-access-token')||''
      }
     });
   }

   patch(uri:string,payload:Object){
    return this.http.patch(`${this.ROOT_URL}/${uri}`,payload,{
      headers:{
        'x-access-token': localStorage.getItem('x-access-token')||''
      }
     });
   }

   delete(uri:string){
    return this.http.delete(`${this.ROOT_URL}/${uri}`,{
      headers:{
        'x-access-token': localStorage.getItem('x-access-token')||''
      }
     })
   }
  
   login(email:string,password:string){
      return this.http.post(`${this.ROOT_URL}/users/login`,{email,password},{observe:'response'})
   }

    
   signup(email:string,password:string){
    return this.http.post(`${this.ROOT_URL}/users`,{email,password},{observe:'response'})
 }


}
