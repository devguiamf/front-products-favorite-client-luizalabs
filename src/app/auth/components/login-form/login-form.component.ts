import { Component, EventEmitter, Input, OnChanges, Output, output, SimpleChanges } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  InputComponent,
  inputTypes,
} from '../../../common/components/input/input.component';
import { ButtonComponent } from '../../../common/components/button/button.component';
import { Login } from '../../../api/auth';

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
export class LoginFormComponent implements OnChanges {
  protected passwordInputType: inputTypes = 'password';
  protected loginForm!: FormGroup;
  @Input() loading: boolean = false;
  @Output('goToRegister') eventGoToRegister: EventEmitter<void> = new EventEmitter();
  @Output('login') eventLogin: EventEmitter<Login> = new EventEmitter();

  constructor(private _fb: FormBuilder) {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['loading']) {
      console.log(changes['loading'].currentValue);
      
      if (changes['loading'].currentValue) {
        this.loginForm.disable();
        this.loading = true;
      } else {
        this.loading = false;
        this.loginForm.enable();
      }
    }
  }

  get hasErrorInLoginForm(){
    return this.loginForm.invalid
  }

  private initForm() {
    this.loginForm = this._fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });
  }

  changeTypeInputPassword() {
    this.passwordInputType =
      this.passwordInputType === 'password' ? 'text' : 'password';
  }

  login() {
    this.eventLogin.emit(this.loginForm.value);
  }
}
