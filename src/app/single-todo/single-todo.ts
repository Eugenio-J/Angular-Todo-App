import { Component, inject } from '@angular/core';
import { RouterOutlet, ActivatedRoute, Router  } from '@angular/router';
import { Todoservice, TodoClass } from '../services/todoservice';
import { FormsModule } from '@angular/forms'; // 👈 Import FormsModule
import { CommonModule } from '@angular/common'; // 👈 Import CommonModule
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-single-todo',
  imports: [FormsModule, CommonModule, RouterOutlet, LucideAngularModule],
  templateUrl: './single-todo.html',
  styleUrl: './single-todo.css'
})
export class SingleTodo {
  index!: number;
  todo!: TodoClass;
  private router = inject(Router);


    constructor(private route: ActivatedRoute, private todoService: Todoservice) {}

  ngOnInit() {
    this.index = Number(this.route.snapshot.paramMap.get('id'));
    // Or subscribe if you expect param changes without reload:
    // this.route.paramMap.subscribe(params => {
    //   this.index = Number(params.get('id'));
    // });
    this.getSingleTask(this.index);
  }

  getSingleTask(index: number)
  {
    
    this.todoService.getSingleTodo(index).subscribe((todo) => 
      {
        this.todo = todo;
      })
  }

    saveEdit(i: number) {
    console.log("Edited value before save:", this.todo); // should be the new text
    if (!this.todo?.title.trim()) return;

    this.todoService.updateTodo(this.todo).subscribe((todo) => {
      if(todo != 0)
        {
          this.cancelEdit();
        }
    });
  }

  cancelEdit() {
       this.router.navigate(['/task-all']);
  }
}
