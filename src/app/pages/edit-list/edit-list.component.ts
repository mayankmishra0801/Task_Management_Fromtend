import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TaskService } from '../../task.service';

@Component({
  selector: 'app-edit-list',
  standalone: true,
  imports: [],
  templateUrl: './edit-list.component.html',
  styleUrl: './edit-list.component.scss'
})
export class EditListComponent  implements OnInit{
  constructor(private route: ActivatedRoute, private taskService:TaskService,private router:Router){

  }

  listId:any;

  ngOnInit() {

    this.route.params.subscribe((params:Params)=>{
      console.log("maghgghgh",params);
      if(params['listId']){
         this.listId = params['listId']
         }
      // else{
      //   this.tasks = undefined;
      // }
//listid issue

    })

  
 }

 updateList(title:string){
     this.taskService.updateList(this.listId,title).subscribe(()=>{
        this.router.navigate(['/lists',this.listId])
     })
 }




}