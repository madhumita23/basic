import { Component } from '@angular/core';

interface Task {
  id:number;
  title:string;
  done:boolean;
}
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  title = "Task Manager";
  newtask = '';
  tasks:Task[] = [
    {id:1,title:'Angular databinding',done:false},
    {id:2,title:'React databinding',done:false},
    

  ];
  nextId = 3;

  //add task
  addtask() {
    const t = this.newtask.trim();
    if(!t) return;
    this.tasks.push({id:this.nextId++,title:t,done:false});
    this.newtask = '';
  }
  x(task:Task) {
    task.done = !task.done;
  }
  //remove
  remove(task:Task) {
    this.tasks = this.tasks.filter(t=>t.id !==task.id);
  }
}
