import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { HttpResponse } from '@angular/common/http';
import { Router,RouterModule } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent implements OnInit{

  constructor(private authServie:AuthService,private router:Router){}
ngOnInit() {
  
}

  onLoginButtonClicked(email:string,password:string){
    this.authServie.login(email,password).subscribe((res:HttpResponse<any>)=>{
      //we have logged in successfully
      console.log("khhjkh",res)
      localStorage.setItem('x-access-token',res.body.token)
      if(res.status === 200){
         this.router.navigate(['/lists'])
      }
      console.log(res);
    })
  }
}
