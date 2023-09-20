import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import {
  SnackBarService,
  snackBarType,
} from '../../services/snack-bar.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  signupProfile: FormGroup = this.fb.group({
    firstName: ['', [Validators.required, Validators.maxLength(12)]],
    lastName: ['', [Validators.required, Validators.maxLength(12)]],
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [
        Validators.required,
        Validators.pattern(
          new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])')
        ),
        Validators.minLength(8),
        Validators.maxLength(12),
        ,
      ],
    ],
  });

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private snackbarService: SnackBarService,
    private router: Router
  ) {}

  signUp() {
    if (this.signupProfile.valid) {
      this.userService.signUp({ ...this.signupProfile.value }).subscribe(
        (res) => {
          this.snackbarService.openSnackBar(
            'Signup successfully.',
            'Ok',
            snackBarType.success
          );
          this.router.navigate(['login']);
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
  }

  getFormControl(name: string) {
    return this.signupProfile.get(name) as FormControl;
  }
}
