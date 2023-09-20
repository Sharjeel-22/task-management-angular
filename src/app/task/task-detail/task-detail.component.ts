import { Component, OnInit } from '@angular/core';
import { ITask } from 'src/app/task/models/task';
import { TaskService } from 'src/app/services/task.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import {
  TaskDialogComponent,
  TaskMethods,
} from 'src/app/task/task-dialog/task-dialog.component';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss'],
})
export class TaskDetailComponent implements OnInit {
  panelOpenState = false;
  taskList!: ITask[];
  userName: string = '';

  constructor(
    private taskService: TaskService,
    private _snackbar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.getTask();
  }

  ngOnInit(): void {}

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

  deleteTask(id: string) {
    this.taskService.deleteTask(id).subscribe(
      (res) => {
        this._snackbar.open('Task Deleted Successfully.', '', {
          horizontalPosition: 'end',
          verticalPosition: 'top',
          duration: 2000,
        });
        this.getTask();
      },
      ({ error }) => {
        this._snackbar.open(error.message, 'Close', {
          horizontalPosition: 'end',
          verticalPosition: 'top',
          duration: 2000,
        });
      }
    );
  }

  openCreateDialog() {
    this.dialog.open(TaskDialogComponent, {
      data: {
        title: 'Create a Task',
        buttonText: 'Create Task',
        taskMethod: TaskMethods.createTask,
      },
      width: '500px',
    });
  }

  openUpdateDialog(formData: ITask) {
    this.dialog.open(TaskDialogComponent, {
      data: {
        title: 'Update a Task',
        buttonText: 'Update Task',
        taskMethod: TaskMethods.updateTask,
        formData,
      },
      width: '500px',
    });
  }
}
