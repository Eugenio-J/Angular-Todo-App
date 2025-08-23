import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleTodo } from './single-todo';

describe('SingleTodo', () => {
  let component: SingleTodo;
  let fixture: ComponentFixture<SingleTodo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleTodo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleTodo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
