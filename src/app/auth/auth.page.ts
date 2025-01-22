import { Component, inject, Injectable } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { Router, RouterLink } from '@angular/router';
import { Login, Register } from '../api/auth';
import { AuthService } from './service/auth.service';
import { HttpErrorResponse, HttpResponseBase } from '@angular/common/http';
import { UserSessionService } from '../common/services/user-session/user-session.service';
import { ROUTE_KEYS } from '../app.routes';
import { ToastNotificationService } from '../common/services/toast-notification/toast-notification.service';

@Component({
  selector: 'auth-page',
  imports: [
    ReactiveFormsModule,
    LoginFormComponent,
    RegisterFormComponent,
    RouterLink,
  ],
  templateUrl: './auth.page.html',
  providers: [AuthService, UserSessionService, ToastNotificationService],
})
export class AuthPage {
  private toastNotificationService = inject(ToastNotificationService);
  private authService = inject(AuthService);
  private userSessionSerivce = inject(UserSessionService);
  private router = inject(Router);

  protected loginState: boolean = true;

  protected changeAuthState() {
    this.loginState = !this.loginState;
  }

  private errorHandler(error: HttpErrorResponse) {
    console.log(error);
    
    this.toastNotificationService.showWarning({
      title: error.error.message[0],
    });
  }

  protected login(event: Login) {
    this.authService.loginAPI(event).subscribe({
      next: (response) => {
        this.userSessionSerivce.setUserSession(response);
        this.router.navigate([ROUTE_KEYS.home]);
      },
      error: (err) => this.errorHandler(err),
    });
  }

  protected register(event: Register) {
    this.authService.registerAPI(event).subscribe({
      next: () => {
        this.toastNotificationService.showSuccess({
          title: 'Parabéns!',
          message: 'Conta criada com sucesso',
        });
        this.changeAuthState();
      },
      error: (err) => this.errorHandler(err),
    });
  }
}
