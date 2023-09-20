import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskRoutingModule } from './task-routing.module';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TaskEditComponent } from './task-edit/task-edit.component';
import { TaskComponent } from './task.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { TaskAddComponent } from './task-add/task-add.component';
import { TaskDialogComponent } from './task-dialog/task-dialog.component';

@NgModule({
  declarations: [
    TaskComponent,
    TaskDetailComponent,
    SidebarComponent,
    TaskDialogComponent,
    TaskEditComponent,
    TaskAddComponent,
  ],
  imports: [CommonModule, TaskRoutingModule, SharedModule, MaterialModule],
})
export class TaskModule {}
