import { Routes } from '@angular/router';
import { TaskviewComponent } from './pages/taskview/taskview.component';
import { NewListComponent } from './pages/new-list/new-list.component';
import { NewTaskComponent } from './pages/new-task/new-task.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SignupPagesComponent } from './pages/signup-pages/signup-pages.component';
import { EditListComponent } from './pages/edit-list/edit-list.component';
import { EditTaskComponent } from './pages/edit-task/edit-task.component';

export const routes: Routes = [
    {path:'',redirectTo:'lists',pathMatch:'full'},
    {path:'lists',component:TaskviewComponent},
    // {path:'new-task',component:NewTaskComponent},
    // {path:'',component:TaskviewComponent},
    {path:'new-list',component:NewListComponent},
    {path:'edit-list/:listId',component:EditListComponent},
    // {path:'edit-task/:listId',component:EditTaskComponent},
    {path:'lists/:listId',component:TaskviewComponent},
    {path:'lists/:listId/new-task',component:NewTaskComponent},
    {path:'login',component:LoginPageComponent},
    {path:'signup',component:SignupPagesComponent},
    {path:'lists/:listId/edit-task/:taskId',component:EditTaskComponent},




];
