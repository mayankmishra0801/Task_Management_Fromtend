import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../task.service';
import { AnyARecord } from 'dns';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { Task } from '../../models/task.model';
import { List } from '../../models/list.model';
import { NgClass } from '@angular/common';
@Component({
  selector: 'app-taskview',
  standalone: true,
  imports: [RouterModule,],
  templateUrl: './taskview.component.html',
  styleUrl: './taskview.component.scss'
})
export class TaskviewComponent implements OnInit{

  lists:List[] = [];
  tasks:Task[] = [];
  selectedListId: any;
  constructor(private taskService:TaskService,private route:ActivatedRoute,private router:Router){}

  ngOnInit(){
     this.route.params.subscribe((params:Params)=>{
          console.log("maghgghgh",params);
          if(params['listId']){
            this.selectedListId = params['listId']
            this.taskService.getTasks(params['listId']).subscribe((tasks:Task[])=>{
              console.log("gggkhhg",tasks)
              this.tasks = tasks;
             })
          }else{
            // this.tasks = undefined;
          }
//listid issue
         
     }
    
    
    )

     this.taskService.getLists().subscribe((lists:List[])=>{
        this.lists = lists;
        console.log("mayank",this.lists)
     })
  }

  onDeleteListClick(){
      this.taskService.deleteList(this.selectedListId).subscribe((res:any)=>{
       this.router.navigate(['/lists']);
        console.log(res)
      })

  }



  onTaskClick(task:Task){
     // we want to set the task to completed
     this.taskService.complete(task).subscribe(()=>{
      console.log("completed successfully")
      // the task has been set to complted successfully
      task.completed = !task.completed;
     })
  }

  onTaskDeleteClick(id:string|undefined){
    this.taskService.deleteTask(this.selectedListId,id).subscribe((res:any)=>{
      // this.router.navigate(['/lists']);
     this.tasks =  this.tasks?.filter(val=>val._id !== id)
       console.log(res)
     })
  }



  

}
