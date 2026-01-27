import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { InputComponent } from "../../../../core/components/input/input.component";
import { PasswordComponent } from "../../../../core/components/password/password.component";
import { ButtonComponent } from "../../../../core/components/button/button.component";
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
  loading = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    // private authService: AuthService
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  submit(): void {
    console.log(this.form.value)
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.error = null;

    const { email, password } = this.form.value;

    // 🔐 Lógica real (ejemplo)
    // this.authService.login(email, password).subscribe({
    //   next: () => {
    //     this.router.navigate(['/']);
    //   },
    //   error: () => {
    //     this.error = 'Usuario o contraseña incorrectos';
    //     this.loading = false;
    //   },
    // });

    // ⛔ Simulación temporal
    this.router.navigate(['/']);
  }

}
