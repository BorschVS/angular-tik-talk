import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { delay, from, map, skip, take, tap } from 'rxjs';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  authService = inject(AuthService);

  form: FormGroup = new FormGroup({
    username: new FormControl<string | null>(null, Validators.required),
    password: new FormControl<string | null>(null, Validators.required),
  });

  constructor() {
    // RxJS have "conveyor principle"
    from([1, 2, 3, 4, 5, 6, 7, 8, 9])
      .pipe(
        map((val) => val * 2),
        take(6),
        skip(2),
        delay(1000),
        tap((val) => this.form.patchValue({ username: val.toString() }))
      )
      .subscribe((val) => {
        console.log(val);
      });
  }

  onSubmit() {
    if (this.form.valid) {
      this.authService.login(this.form.value).subscribe((res) => {
        console.log(res);
      });
    }
  }
}
