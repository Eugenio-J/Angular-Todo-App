import { Component, signal, OnInit, inject } from '@angular/core';
import { Todoservice, TodoClass } from '../services/todoservice';
import { FormsModule } from '@angular/forms'; // 👈 Import FormsModule
import { CommonModule } from '@angular/common'; // 👈 Import CommonModule
import { TodoItem } from '../todo-item/todo-item'; // 👈 Import CommonModule
import { RouterOutlet, RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.html',
  standalone: true,
  imports: [FormsModule, CommonModule, TodoItem, RouterOutlet],
  styleUrl: './todo.css'
})
export class Todo implements OnInit{
  todos: TodoClass[] = [];
  newTodo: string = '';
  editingIndex: number | null = null;
  singleTodo: TodoClass = { id: 0, title: '', isComplete: false };
  errorMessage: string = '';
  private router = inject(Router);

  constructor(private todoService: Todoservice) {}

   ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos() {
    this.todoService.getTodos().subscribe(data => this.todos = data);
  }

  getSingleTask(index: number)
  {
    const todo = this.todos[index];

    this.todoService.getSingleTodo(index).subscribe(() => 
      {
        this.newTodo = todo.title;
      })
  }
  
  addTodo() {
    if (!this.newTodo.trim()) {
      this.errorMessage = 'Todo cannot be empty!';
      return;
    }
    this.todoService
      .addTodo({ title: this.newTodo, isComplete: false })
      .subscribe((todo) => {
        this.todos.push(todo);
        this.newTodo = '';
        this.errorMessage = '';
      });
  }

  startEdit(i: number) {
    const todo = { ...this.todos[i], title: this.singleTodo.title };
    this.router.navigate(['/single-task', todo.id]);
    this.editingIndex = i;
    this.singleTodo = this.todos[i];
  }


  saveEdit(i: number) {
    console.log("Edited value before save:", this.singleTodo); // should be the new text
    if (!this.singleTodo?.title.trim()) return;

    const todo = { ...this.todos[i], title: this.singleTodo.title };
    this.todoService.updateTodo(todo).subscribe(() => {
      this.todos[i] = todo;
      this.editingIndex = null;
    });
    this.singleTodo = { id: 0, title: '', isComplete: false };
  }

  cancelEdit() {
    this.editingIndex = null;
  }

  removeTodo(i: number) {
    const id = this.todos[i].id;
    this.todoService.deleteTodo(id).subscribe(() => {
      this.todos.splice(i, 1);
    });
  }

}
