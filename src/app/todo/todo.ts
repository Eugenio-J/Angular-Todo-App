import { Component, signal, OnInit, inject } from '@angular/core';
import { Todoservice, TodoClass } from '../services/todoservice';
import { FormsModule } from '@angular/forms'; // 👈 Import FormsModule
import { CommonModule } from '@angular/common'; // 👈 Import CommonModule
import { TodoItem } from '../todo-item/todo-item'; // 👈 Import CommonModule
import { RouterOutlet, Router } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.html',
  standalone: true,
  imports: [FormsModule, CommonModule, TodoItem, RouterOutlet, LucideAngularModule],
  styleUrl: './todo.css'
})  
export class Todo implements OnInit{
  todos = signal<TodoClass[]>([]); // reactive store for todos
  newTodo: string = '';
  editingIndex: number | null = null;
  singleTodo: TodoClass = { id: 0, title: '', isCompleted: false };
  errorMessage: string = '';
  filter: 'All' | 'Active' | 'Completed' = 'All';
  filterOptions: Array<'All' | 'Active' | 'Completed'> = ['All', 'Active', 'Completed'];
  private router = inject(Router);


  constructor(private todoService: Todoservice) {}

   ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos() {
    this.todoService.getTodos().subscribe(data => 
      {
        console.log(data);
          this.todos.set(data);
      });
  }

  getSingleTask(index: number)
  {
    const todo = this.todos()[index];

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
      .addTodo({ title: this.newTodo, isCompleted: false })
      .subscribe((todo) => {
        this.todos().push(todo);
        this.newTodo = '';
        this.errorMessage = '';
      });
  }

  startEdit(i: number) {
    const todo = { ...this.todos()[i], title: this.singleTodo.title };
    this.router.navigate(['/single-task', i]);
    this.editingIndex = i;
    this.singleTodo = this.todos()[i];
  }


  saveEdit(i: number) {
    console.log("Edited value before save:", this.singleTodo); // should be the new text
    if (!this.singleTodo?.title.trim()) return;

    const todo = { ...this.todos()[i], title: this.singleTodo.title };
    this.todoService.updateTodo(todo).subscribe(() => {
      this.todos()[i] = todo;
      this.editingIndex = null;
    });
    this.singleTodo = { id: 0, title: '', isCompleted: false };
  }

  cancelEdit() {
    this.editingIndex = null;
  }

  removeTodo(id: number) {
    this.todoService.deleteTodo(id).subscribe(() => {
       this.todos.update(todos => todos.filter(todo => todo.id !== id));
    });
  }
  
  clearCompleted() {
  this.todos.update(todos => todos.filter(todo => !todo.isCompleted));
  }

  get filteredTodos() {
    return this.todos().filter(todo => {
      switch (this.filter) {
        case 'Active': return !todo.isCompleted;
        case 'Completed': return todo.isCompleted;
        default: return true;
      }
    });
  }

   get activeTodosCount() {
    return this.todos().filter(todo => !todo.isCompleted).length;
  }

  get completedTodosCount() {
    return this.todos().filter(todo => todo.isCompleted).length;
  }

  toggleTodo(id: number) {
  console.log("Toggle status with id:", id); // should be the new text
  this.todoService.updateStatus(id).subscribe(() => {
    this.todos.update(todos =>
      todos.map(todo =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  });
  }

}
