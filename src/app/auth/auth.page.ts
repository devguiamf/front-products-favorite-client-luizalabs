import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginFormComponent } from "./login-form/login-form.component";
import { RegisterFormComponent } from "./register-form/register-form.component";

@Component({
  selector: 'auth-page',
  imports: [ReactiveFormsModule, LoginFormComponent, RegisterFormComponent],
  templateUrl: './auth.page.html'
})
export class AuthPage {
  loginState: boolean = true;

  changeAuthState(){
    this.loginState = !this.loginState;
  }
}
