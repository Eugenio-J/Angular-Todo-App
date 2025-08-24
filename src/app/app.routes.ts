import { Routes } from '@angular/router';

import {Todo} from '../app/todo/todo'
import {SingleTodo} from '../app/single-todo/single-todo'

export const routes: Routes = [
    {
        path: 'task-all',
        component: Todo,
        title: 'All Task',
    },
    {
        path: 'single-task/:id',
        component: SingleTodo,
        title: 'Single To Do'        
    },
];
