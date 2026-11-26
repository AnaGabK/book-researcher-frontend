import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

export interface LoginCredentials {
  email: string;
  senha: string;
  lembrar: boolean;
}

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {
  @Output() loginSubmit = new EventEmitter<LoginCredentials>();
  @Output() googleLogin = new EventEmitter<void>();

  mostrarSenha = false;

  loginForm = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    senha: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(6)],
    }),
    lembrar: new FormControl(false, { nonNullable: true }),
  });

  entrar(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loginSubmit.emit(this.loginForm.getRawValue());
  }

  entrarComGoogle(): void {
    this.googleLogin.emit();
  }
}
