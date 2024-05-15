export class ToDo {
    description !: string;
    priority !: string;
    due !: Date;
    completed !: boolean;

    constructor(description : string, priority : string, due : Date, completed : boolean){
        this.description = description;
        this.priority = priority;
        this.due = due;
        this.completed = completed;
    }
}
