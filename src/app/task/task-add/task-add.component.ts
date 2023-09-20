import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ITask } from '../models/task';
import { TaskService } from 'src/app/services/task.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import {
  SnackBarService,
  snackBarType,
} from 'src/app/services/snack-bar.service';

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.scss'],
})
export class TaskAddComponent {
  taskProfile: FormGroup = this.fb.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
    dueDate: [199999, [Validators.required]],
  });

  id: string = '';
  task!: ITask;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private _snackbar: MatSnackBar,
    private router: Router,
    private snackbarService: SnackBarService
  ) {}

  ngOnInit() {}

  createTask() {
    this.taskService.createTask({ ...this.taskProfile.value }).subscribe(
      (res) => {
        this.snackbarService.openSnackBar(
          'Task Created.',
          'Ok',
          snackBarType.success
        );
        this.router.navigate(['task']);
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

  getFormControl(name: string) {
    return this.taskProfile.get(name) as FormControl;
  }
}
