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

  private readonly rememberedEmailKey = 'sinergy_erp_remembered_email';

  form: FormGroup;
  loading:any = signal(false);
  error = signal<string | null>(null);

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
    const rememberedEmail = this.getRememberedEmail();

    this.form = this.fb.group({
      email: [rememberedEmail, [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      rememberUser: [!!rememberedEmail],
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

    const { email, password, rememberUser } = this.form.value;
  
    this.authService.login({ email, password }).subscribe({
      next: () => {
        this.persistRememberedEmail(email, rememberUser);
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

  private getRememberedEmail(): string {
    try {
      return localStorage.getItem(this.rememberedEmailKey)?.trim() ?? '';
    } catch {
      return '';
    }
  }

  private persistRememberedEmail(email: string, rememberUser: boolean): void {
    try {
      if (rememberUser && email) {
        localStorage.setItem(this.rememberedEmailKey, email.trim());
      } else {
        localStorage.removeItem(this.rememberedEmailKey);
      }
    } catch {
      // Storage puede estar bloqueado (modo privado); el login no debe fallar.
    }
  }

}
