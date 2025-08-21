import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Todo } from './todo/todo';
import { FormsModule } from '@angular/forms';   // 👈 add this
import { NgModule } from '@angular/core';


@Component({
  selector: 'app-root',
  imports: [Todo, FormsModule], // 👈 import the todo component
  template: '<app-todo></app-todo>',  
})

export class App {
  protected readonly title = signal('to-do');
}
