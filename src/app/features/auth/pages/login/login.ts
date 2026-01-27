import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { InputComponent } from "../../../../core/components/input/input.component";
import { PasswordComponent } from "../../../../core/components/password/password.component";
import { ButtonComponent } from "../../../../core/components/button/button.component";
import { AuthService } from '../../../../core/services/auth.service';
import { signal } from '@angular/core';
// import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputComponent, PasswordComponent, ButtonComponent,ButtonComponent],
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})
export class Login{

  form: FormGroup;
  loading:any = signal(false);
  error = signal<string | null>(null);

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
  
    this.loading.set(true);
    this.error.set(null);
  
    this.authService.login(this.form.value).subscribe({
      next: (res: any) => {
        if (res.status) {
          this.router.navigate(['/']);
        } else {
          this.loading.set(false);
          this.error.set('Usuario o contraseña incorrectos');
        }
      },
      error: () => {
        this.loading.set(false);
        this.error.set('Usuario o contraseña incorrectos');
      },
    });
  }
  

}
