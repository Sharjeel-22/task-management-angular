import { Component } from '@angular/core';
import { FormBuilder, Form, FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';
import { ITask } from 'src/app/task/models/task';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss'],
})
export class TaskEditComponent {
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
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      if (this.id) {
        this.getTask(this.id);
      }
    });
  }

  updateTask() {
    this.taskService
      .updateTask(this.id, { ...this.taskProfile.value })
      .subscribe(
        (res) => {
          this._snackbar.open('Task updated Successfully.', '', {
            horizontalPosition: 'end',
            verticalPosition: 'top',
            duration: 2000,
          });
          this.router.navigate(['dashboard']);
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

  getTask(id: string) {
    this.taskService.getTask(id).subscribe((res: any) => {
      this.task = res.body;
      this.taskProfile.setValue({
        title: this.task.title,
        description: this.task.description,
        dueDate: this.task.dueDate,
      });
    });
  }

  getFormControl(name: string) {
    return this.taskProfile.get(name) as FormControl;
  }
}
