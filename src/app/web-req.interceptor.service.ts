import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, empty, Observable, Subject, switchMap, tap, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class WebReqInterceptor implements HttpInterceptor  {

  constructor(private authService:AuthService) { }
   
  refreshingAccessToken:boolean | undefined;
  accessTokenRefreshed:Subject<any> = new Subject()


  intercept(request:HttpRequest<any>,next:HttpHandler):Observable<any>{
    request = this.addAuthHeader(request);

    // call next() and handle the response
    return next.handle(request).pipe(
      catchError((error:HttpErrorResponse)=>{
      
        if(error.status === 401){

        return  this.refreshAccessToken().pipe(
            switchMap(()=>{
              request = this.addAuthHeader(request);
              return next.handle(request)
            }),
            catchError((err:any)=>{
              console.log(err);
              this.authService.logout();
              return empty();
            })
          )
          //refresh the access token
          // this.authService.logout()
        }

        console.log(error)
        return throwError(error);
      })
    )
  }

  refreshAccessToken(){

    if(this.refreshingAccessToken){
       
      return new Observable(observer=>{
           this.accessTokenRefreshed.subscribe(()=>{
              //this code will run when the access token has refreshed
              observer.next();
              observer.complete()
           })
      })

    }else{

      this.refreshingAccessToken = true;
      return this.authService.getNewAccessToken().pipe(
        tap(()=>{
          this.refreshingAccessToken = false;
          this.accessTokenRefreshed.next();
          console.log("Access Token refreshed")
        })
      )

    }

 
    // we wnat to call the method in auth service to send a request to refresh the access token
  }

  addAuthHeader(request:HttpRequest<any>){
     //get the access token
     //append the access token to the request header
     const token = this.authService.getAccessToken();
     if(token){
      return request.clone({
        setHeaders:{
          'x-access-token': token
       }
      });
      
     
  }
  return request;
}
}
