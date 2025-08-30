import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';   // 👈 add this
import { NgModule } from '@angular/core';
import { Todo } from '../app/todo/todo';


@Component({
  selector: 'app-root',
  imports: [RouterLink, RouterOutlet, FormsModule, Todo], // 👈 import the todo component
  templateUrl: './app.html',  
  styleUrl: './app.css'
})

export class App {
  protected readonly title = signal('to-do');

}
