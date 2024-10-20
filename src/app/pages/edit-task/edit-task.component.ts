import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TaskService } from '../../task.service';

@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [],
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.scss'
})
export class EditTaskComponent implements OnInit {



  constructor(private route: ActivatedRoute, private taskService:TaskService,private router:Router){

  }

  taskId:any;
  listId:any;

  ngOnInit() {

    this.route.params.subscribe((params:Params)=>{
      console.log("maghgghgh",params);
          this.taskId = params['taskId'];
          this.listId = params['listId'];

    }
     
//listid issue

    )}

  
 

 updateTask(title:string){
     this.taskService.updateTask(this.listId,this.taskId,title).subscribe(()=>{
        this.router.navigate(['/lists',this.listId])
     })
 }


}