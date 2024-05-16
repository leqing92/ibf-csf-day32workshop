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
  editMode : boolean = false;
  editTodoAtIndex !: number;
   // todo : ToDo = new ToDo("", "", new Date(), false);

  constructor(private formBuilder : FormBuilder){}
  
  ngOnInit(): void {
    //loading the todos when the page is loaded
    this.loadTodosFromLocalStorage();

    this.todoForm = this.formBuilder.group({
      description : this.formBuilder.control<string>("", [Validators.required, Validators.minLength(5)]),
      priority : this.formBuilder.control<string>("Low", [Validators.required]),
      due : this.formBuilder.control<Date | null>(null, [Validators.required, CustomValidator.notPast])
    })
  }

  //function to load todos from local storage
  loadTodosFromLocalStorage() {
    const localTodos = localStorage.getItem("todos");
  
    //in javascript empty strings, null, undefined, 0, and false are considered falsy
    if (localTodos) {
      this.todos = JSON.parse(localTodos) as ToDo[];
    }
  }

  onSubmit(){    
    // const form = this.todoForm.value;
    // console.log(form);

    if(this.todoForm.valid){
      const input : ToDo = this.todoForm.value as ToDo;
      //set the todo.completed as false on submit
      input.completed = false;

      console.log(input);
      this.todos.push(input);
      //save todos to local storage; must JSON.stringify
      localStorage.setItem("todos", JSON.stringify(this.todos));

      //set priority to low after submit
      this.todoForm.reset({priority : "Low"});
    }
    else{
      console.info("no valid input");
    }
  }

  toEdit(index : number) {
    this.editMode = true;
    this.editTodoAtIndex = index;
    const todoToEdit = this.todos.at(index);

    this.todoForm.get('description')?.setValue(todoToEdit?.description);
    this.todoForm.get('priority')?.setValue(todoToEdit?.priority);
    this.todoForm.get('due')?.setValue(todoToEdit?.due);

    // this.todoForm = this.formBuilder.group({
    //   description : this.formBuilder.control<string | undefined>(todoToEdit?.description, [Validators.required, Validators.minLength(5)]),
    //   priority : this.formBuilder.control<string | undefined>(todoToEdit?.priority, [Validators.required]),
    //   due : this.formBuilder.control<Date | undefined>(todoToEdit?.due, [Validators.required, CustomValidator.notPast])
    // })

  }

  toUpdate() {
    if(this.todoForm.valid){
      // const input : ToDo = this.todoForm.value as ToDo;
      // input.completed = this.todos.at(this.editTodoAtIndex)?.completed ?? false;
      //get the new input
      let description = this.todoForm.get('description')?.value;
      let priority = this.todoForm.get('priority')?.value;
      let due = this.todoForm.get('due')?.value;
      //set the input to array
      this.todos[this.editTodoAtIndex].description = description;
      this.todos[this.editTodoAtIndex].priority = priority;
      this.todos[this.editTodoAtIndex].due = due;

      localStorage.setItem("todos", JSON.stringify(this.todos));
      
      this.editMode = false;
      this.todoForm.reset({priority : "Low"});
    }
  }

  onDelete(index : number){
    console.info("delete");
    this.todos.splice(index, 1)
    localStorage.setItem("todos", JSON.stringify(this.todos));
  }

  onToggleComplete(index: number) {
    this.todos[index].completed = !this.todos[index].completed;
    localStorage.setItem("todos", JSON.stringify(this.todos));
  }

}
