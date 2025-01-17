import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  protected password_input_type: string = 'password';
  protected login_form!: FormGroup;

  constructor(private _fb: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.login_form = this._fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
    });
  }

  changeTypeInputPassword() {
    this.password_input_type =
      this.password_input_type === 'password' ? 'text' : 'password';
  }
}
