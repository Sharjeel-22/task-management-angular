import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {
  SnackBarService,
  snackBarType,
} from 'src/app/services/snack-bar.service';
import { TaskService } from 'src/app/services/task.service';
import { ITask } from '../models/task';

export interface DialogData {
  taskMethod: TaskMethods;
  title: string;
  buttonText: string;
  formData?: ITask;
}

export enum TaskMethods {
  createTask = 'createTask',
  updateTask = 'updateTask',
}

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss'],
})
export class TaskDialogComponent implements OnInit {
  taskProfile: FormGroup = this.fb.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
    dueDate: [, [Validators.required]],
  });

  title: string = '';
  buttonText: string = '';
  taskMethod!: TaskMethods;
  formData!: ITask | undefined;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private snackbarService: SnackBarService,
    private dialogRef: MatDialogRef<TaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: DialogData
  ) {}

  ngOnInit(): void {
    this.getDialogDetails();
  }

  getFormControl(name: string) {
    return this.taskProfile.get(name) as FormControl;
  }

  createTask() {
    this.taskService.createTask({ ...this.taskProfile.value }).subscribe({
      next: (res) => {
        this.snackbarService.openSnackBar(
          'Task Created.',
          'Ok',
          snackBarType.success
        );
        this.dialogRef.close();
      },
      error: ({ error }) => {
        this.snackbarService.openSnackBar(
          error.message,
          'Ok',
          snackBarType.error
        );
      },
    });
  }

  updateTask() {
    this.taskService
      .updateTask(this.formData?._id as string, { ...this.taskProfile.value })
      .subscribe(
        (res) => {
          this.snackbarService.openSnackBar(
            'Task Updated.',
            'Ok',
            snackBarType.success
          );
          this.dialogRef.close();
        },
        ({ error }) => {
          this.snackbarService.openSnackBar(
            error.message,
            'Ok',
            snackBarType.error
          );
        }
      );
  }

  getDialogDetails() {
    ({
      title: this.title,
      buttonText: this.buttonText,
      taskMethod: this.taskMethod,
      formData: this.formData,
    } = this.dialogData);
  }
}
