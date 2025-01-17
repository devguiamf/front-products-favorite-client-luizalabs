import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
  InputComponent,
  inputTypes,
} from '../../common/components/input/input.component';
import { ButtonComponent } from '../../common/components/button/button.component';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, InputComponent, ButtonComponent],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  protected passwordInputType: inputTypes = 'password';
  protected loginForm!: FormGroup;

  constructor(private _fb: FormBuilder) {
    this.initForm();
  }

  initForm() {
    this.loginForm = this._fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
    });
  }

  changeTypeInputPassword() {
    this.passwordInputType =
      this.passwordInputType === 'password' ? 'text' : 'password';
  }

  login() {}
}
