import { Component } from '@angular/core';
import { TaskService } from '../services/task.service';
import { ITask } from './models/task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent {
  isSideNavOpen: boolean = true;
  taskList!: ITask[];

  constructor(private taskService: TaskService) {
    this.getTask();
  }

  getTask() {
    this.taskService.getTasks().subscribe(
      (res: any) => {
        this.taskList = res.body.tasks;
      },
      ({ error }) => {
        console.log(error);
      }
    );
  }
}
