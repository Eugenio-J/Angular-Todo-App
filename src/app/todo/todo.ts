import { Component, signal, OnInit } from '@angular/core';
import { Todoservice, TodoClass } from '../services/todoservice';
import { FormsModule } from '@angular/forms'; // 👈 Import FormsModule
import { CommonModule } from '@angular/common'; // 👈 Import CommonModule

@Component({
  selector: 'app-todo',
  templateUrl: './todo.html',
  imports: [FormsModule, CommonModule],
  styleUrl: './todo.css'
})
export class Todo implements OnInit{
  todos: TodoClass[] = [];
  newTodo: string = '';
  editingIndex: number | null = null;
  editedTodo: string = '';
  errorMessage: string = '';

  constructor(private todoService: Todoservice) {}

   ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos() {
    this.todoService.getTodos().subscribe(data => this.todos = data);
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
    this.editingIndex = i;
    this.editedTodo = this.todos[i].title;
  }


  saveEdit(i: number) {
    if (!this.editedTodo.trim()) return;

    const todo = { ...this.todos[i], title: this.editedTodo };
    this.todoService.updateTodo(todo).subscribe(() => {
      this.todos[i] = todo;
      this.editingIndex = null;
    });
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
