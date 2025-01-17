import { Component, output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  InputComponent,
  inputTypes,
} from '../../common/components/input/input.component';
import { ButtonComponent } from '../../common/components/button/button.component';

@Component({
  selector: 'login-form-component',
  imports: [ReactiveFormsModule, InputComponent, ButtonComponent],
  templateUrl: './login-form.component.html',
  styles: `
    :host {
      display: block;
    }
  `
})
export class LoginFormComponent {
  protected passwordInputType: inputTypes = 'password';
  protected loginForm!: FormGroup;
  eventGoToRegister = output({ alias: 'goToRegister' });

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
