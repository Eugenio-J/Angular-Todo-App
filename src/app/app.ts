import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { Todo } from './todo/todo';
import { FormsModule } from '@angular/forms';   // 👈 add this
import { NgModule } from '@angular/core';


@Component({
  selector: 'app-root',
  imports: [RouterLink, RouterOutlet, Todo, FormsModule], // 👈 import the todo component
  templateUrl: './app.html',  
  styleUrl: './app.css'
})

export class App {
  protected readonly title = signal('to-do');
}
