import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../task.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.scss'
})
export class NewTaskComponent implements OnInit{

  constructor(private taskService:TaskService, private route:ActivatedRoute,private router:Router){

  }
   
  listId:string | undefined;






  ngOnInit(){

    this.route.params.subscribe((params:Params)=>{
      console.log("maghgghgh",params);
      this.listId =  params['listId'];
      // why ['get']
      console.log(this.listId);


 }


)




    
    
  }
  createTask(title:string){
    // ! is not there is original one
     this.taskService.createTask(title,this.listId!).subscribe((newTask:any)=>{
        // console.log(newTask);

        //newTask:Task
        this.router.navigate(['../'],{relativeTo:this.route});
     })
      
  }

}
