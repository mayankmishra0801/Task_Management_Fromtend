import { inject, Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';
import { Task } from './models/task.model';
import { List } from './models/list.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
 private webReqService= inject(WebRequestService);

  
  createList(title:string){
    return this.webReqService.post(`lists`,{title});
  }

  updateList(id:string,title:string){


    return this.webReqService.patch(`lists/${id}`,{title});
  }
  updateTask(listId:string,taskId:string,title:string){
    return this.webReqService.patch(`lists/${listId}/tasks/${taskId}`,{title});

  }



 
  deleteTask(listId:string|undefined,taskId:string|undefined){
    return this.webReqService.delete(`lists/${listId}/tasks/${taskId}`)
 }

 deleteList(id:string){
  return this.webReqService.delete(`lists/${id}`)

 }

  getLists(){
    return this.webReqService.get('lists');
  }
  getTasks(listId:string){
    return this.webReqService.get(`lists/${listId}/tasks`);

  }
    

  createTask(title:string,listId:string){
    return this.webReqService.post(`lists/${listId}/tasks`,{title});
  }

  complete(task:Task){
     return this.webReqService.patch(`lists/${task._listId}/tasks/${task._id}`,{
      completed:!task.completed
     }
    );
  }
}
