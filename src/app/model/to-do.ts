export class ToDo {
    description !: string;
    priority !: string;
    due !: Date;

    constructor(description : string, priority : string, due : Date){
        this.description = description;
        this.priority = priority;
        this.due = due;
    }
}
