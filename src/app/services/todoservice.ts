import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TodoClass {
  id: number;
  title: string;
  isComplete: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class Todoservice {
   private apiUrl = 'https://localhost:7224/api/todo'; // 👈 your API URL

  constructor(private http: HttpClient) {}


  getTodos(): Observable<TodoClass[]> {
    return this.http.get<TodoClass[]>(`${this.apiUrl}/get-all-task`);
  }

 getSingleTodo(index: number): Observable<TodoClass> {
    return this.http.get<TodoClass>(`${this.apiUrl}/get-single-task/${index}`);
  }


  addTodo(todo: Partial<TodoClass>): Observable<TodoClass> {
    return this.http.post<TodoClass>(`${this.apiUrl}/add-task`, todo);
  }

  updateTodo(todo: TodoClass): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/update-task?taskId=${todo.id}`, todo);
  }

  deleteTodo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete-task?taskId=${id}`);
  }
}
