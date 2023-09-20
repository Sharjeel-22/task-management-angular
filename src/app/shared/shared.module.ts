import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SnackBarComponent } from './snack-bar/snack-bar.component';
import { MaterialModule } from '../material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { TwoSideComponent } from './two-side/two-side.component';

@NgModule({
  declarations: [InputComponent, SnackBarComponent, TwoSideComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
  ],
  exports: [
    InputComponent,
    FormsModule,
    ReactiveFormsModule,
    SnackBarComponent,
    MaterialModule,
    TwoSideComponent,
  ],
})
export class SharedModule {}
