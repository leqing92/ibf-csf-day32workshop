import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToDo } from '../../model/to-do';
import { CustomValidator } from '../../validator/custom-validator';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrl: './to-do.component.css'
})
export class ToDoComponent implements OnInit{

  todoForm !: FormGroup;

  todos : ToDo[] = [];

  //function to load todos from local storage
  loadTodosFromLocalStorage() {
    const localTodos = localStorage.getItem("todos");
    //in javascript empty strings, null, undefined, 0, and false are considered falsy
    if (localTodos) {
      this.todos = JSON.parse(localTodos) as ToDo[];
    }
  }

  todo : ToDo = new ToDo("", "", new Date());

  constructor(private formBuilder : FormBuilder){}
  
  ngOnInit(): void {
    //loading the todos when the page is loaded
    this.loadTodosFromLocalStorage();

    this.todoForm = this.formBuilder.group({
      description : this.formBuilder.control<string>("", [Validators.required]),
      priority : this.formBuilder.control<string>("", [Validators.required]),
      due : this.formBuilder.control<Date | null>(null, [Validators.required, CustomValidator.notPast])
    })
  }

  onSubmit(){
    if(this.todoForm.valid){
      const input : ToDo = this.todoForm.value as ToDo;
      console.log(input);
      this.todos.push(input);
      //save todos to local storage; must JSON.stringify
      localStorage.setItem("todos", JSON.stringify(this.todos));
    }
    else{
      console.info("no valid input");
    }
  }

  onDelete(index : number){
    console.info("delete");
    this.todos.splice(index, 1)
    localStorage.setItem("todos", JSON.stringify(this.todos));
  }

}
