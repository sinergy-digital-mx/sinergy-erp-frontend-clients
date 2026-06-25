import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { InputComponent } from "../../../../core/components/input/input.component";
import { PasswordComponent } from "../../../../core/components/password/password.component";
import { ButtonComponent } from "../../../../core/components/button/button.component";
import { AuthService } from '../../../../core/services/auth.service';
import { PolluxBrandTextComponent } from '../../../../core/components/pollux-brand-text/pollux-brand-text.component';
// import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputComponent, PasswordComponent, ButtonComponent, ButtonComponent, PolluxBrandTextComponent],
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
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
    });

    const reason = this.route.snapshot.queryParamMap.get('reason');
    if (reason === 'no-access') {
      this.error.set('Tu cuenta no tiene módulos asignados. Contacta al administrador.');
    }
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
  
    this.loading.set(true);
    this.error.set(null);
  
    this.authService.login(this.form.value).subscribe({
      next: () => {
        const isPosTerminal = this.authService.isPosTerminalUser();
        const route = this.authService.resolvePostLoginRoute();
        this.loading.set(false);
        if (!route) {
          this.authService.clearSession();
          if (isPosTerminal) {
            this.error.set('Tipo de terminal POS no configurado. Contacta al administrador.');
          } else {
            this.error.set('Tu cuenta no tiene módulos asignados. Contacta al administrador.');
          }
          return;
        }
        void this.router.navigateByUrl(route, { replaceUrl: true });
      },
      error: () => {
        this.loading.set(false);
        this.error.set('Usuario o contraseña incorrectos');
      },
    });
  }
  

}
