import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TodoClass } from '../services/todoservice';
import { FormsModule } from '@angular/forms'; // 👈 Import FormsModule
import { CommonModule, NgOptimizedImage } from '@angular/common'; // 👈 Import CommonModule

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.html',
  imports: [FormsModule, CommonModule],
  styleUrl: './todo-item.css'
})
export class TodoItem {
    @Input() todoitem!: TodoClass;
    @Input() editingIndex: number | null = null;
    @Input() singleTodo: TodoClass = { id: 0, title: '', isComplete: false };
    @Input() index!: number;
    @Output() updateTask = new EventEmitter<number>();
    @Output() deleteTask = new EventEmitter<void>();
    @Output() cancelEdit = new EventEmitter<void>();
    @Output() startEdit = new EventEmitter<number>();

    onUpdate(i: number)
    {
      this.updateTask.emit(i);
    }
    
    onDelete()
    {
      this.deleteTask.emit();
    }

    onStartEdit(i : number) {
    this.startEdit.emit(i);
  }


    onCancelEdit() {
    this.editingIndex = null;
  }
}
