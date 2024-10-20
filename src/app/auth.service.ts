import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';
import { Router } from '@angular/router';
import { shareReplay,tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private webService: WebRequestService,private router:Router,private http:HttpClient) {



   }


   login(email:string,password:string){
    return  this.webService.login(email,password).pipe(
      shareReplay(),
      tap((res:HttpResponse<any>)=>{
        // auth token will be in the header of this response
        //  this.setSession(res.body._id, res.headers.get('x-access-token'),res.headers.get('x-refresh-token'))
     
        const userId = res.body._id;
        const accessToken = res.headers.get('x-access-token') || ''; // Fallback to an empty string if null
        const refreshToken = res.headers.get('x-refresh-token') || ''; // Fallback to an empty string if null
        this.setSession(userId,accessToken,refreshToken)
        console.log("Logged In");
        console.log(res);
        })
     )

   }


   signup(email:string,password:string){
    return  this.webService.signup(email,password).pipe(
      shareReplay(),
      tap((res:HttpResponse<any>)=>{
        // auth token will be in the header of this response
        //  this.setSession(res.body._id, res.headers.get('x-access-token'),res.headers.get('x-refresh-token'))
     
        const userId = res.body._id;
        const accessToken = res.headers.get('x-access-token') || ''; // Fallback to an empty string if null
        const refreshToken:any = res.headers.get('x-refresh-token'); // Fallback to an empty string if null
        this.setSession(userId,accessToken,refreshToken)
        console.log("signed In success");
        console.log(res);
        })
     )

   }

   private setSession(userId:string,accessToken:string,refreshToken:string){
      localStorage.setItem('user-id',userId);
      localStorage.setItem('x-access-token',accessToken);
      localStorage.setItem('x-refresh-token',refreshToken)
   }

   private removeSession(){
    localStorage.removeItem('user-id');
    localStorage.removeItem('x-access-token');
    localStorage.removeItem('x-refresh-token')
 }

 logout(){
  this.removeSession();
   this.router.navigate(['/login'])

 }
 getAccessToken(){
    return localStorage.getItem('x-access-token')
 }

 getUserId(){
   return localStorage.getItem('user-id')||'';
 }

 setAccessToken(accessToken:string|undefined){
   localStorage.setItem('x-access-token',accessToken||'')
 }

 getRefreshToken(){
   return localStorage.getItem('x-refresh-token')||'';
 }

 getNewAccessToken(){
   return this.http.get(`${this.webService.ROOT_URL}/users/me/access-token`,{
     headers:{
      'x-refresh-token': this.getRefreshToken(),
      '_id': this.getUserId()
     },
     observe:'response'
   }).pipe(
    tap((res:HttpResponse<any>)=>{
      this.setAccessToken(res.headers.get('x-access-token')||'')
    })
   )
 }


}
