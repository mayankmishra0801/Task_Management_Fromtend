import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../task.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { List } from '../../models/list.model';

@Component({
  selector: 'app-new-list',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './new-list.component.html',
  styleUrl: './new-list.component.scss'
})
export class NewListComponent implements OnInit{


  constructor(private taskService:TaskService,private router:Router){

  }
    
  

  ngOnInit() {
    
  }

  createList(title:string){

    this.taskService.createList(title).subscribe((list:any)=>{
      //
      console.log("Hii",list)
      this.router.navigate(['/lists',list._id]);
      //now we navigate to /lists/response._id
  })

  }

}
