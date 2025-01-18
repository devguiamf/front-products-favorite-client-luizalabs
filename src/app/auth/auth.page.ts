import { Component, inject, Injectable } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginFormComponent } from "./components/login-form/login-form.component";
import { RegisterFormComponent } from "./components/register-form/register-form.component";
import { Router, RouterLink } from '@angular/router';
import { Login, Register } from '../api/auth';
import { AuthService } from './service/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UserSessionService } from '../common/services/user-session/user-session.service';
import { ROUTE_KEYS } from '../app.routes';

@Component({
  selector: 'auth-page',
  imports: [ReactiveFormsModule, LoginFormComponent, RegisterFormComponent, RouterLink],
  templateUrl: './auth.page.html'
})
export class AuthPage {

  loginState: boolean = true;

  authService = inject(AuthService)
  userSessionSerivce = inject(UserSessionService)
  router = inject(Router)

  changeAuthState(){
    this.loginState = !this.loginState;
  }

  login(event:Login){
    this.authService.loginAPI(event)
      .subscribe({
        next: (response) => {
          this.userSessionSerivce.setUserSession(response);
          this.router.navigate([ROUTE_KEYS.home]);
        },
        error: (err) => this.errorHandler(err)
      })
  }

  register(event: Register){
    this.authService.registerAPI(event)
      .subscribe({
        next: () => {
          this.changeAuthState();
        }
        ,
        error: (err) => this.errorHandler(err)
      })
  }

  errorHandler(error: HttpErrorResponse){}
}
