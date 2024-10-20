import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Route, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-signup-pages',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './signup-pages.component.html',
  styleUrl: './signup-pages.component.scss'
})
export class SignupPagesComponent implements OnInit {

   constructor(private authService:AuthService, private router:Router){

   }

   ngOnInit() {
     
   }

  //  onSignupButtonClicked(email:string,passowrd:string){
  //   this.authService.signup(email,passowrd).subscribe((res:HttpResponse<any>)=>{
  //     console.log(res);
  //   })
  // }


  onSignupButtonClicked(email: string, password: string) {
    this.authService.signup(email, password).subscribe((res: HttpResponse<any>) => {
      console.log(res);
      this.router.navigate(['/lists']);
    });
  }

}
