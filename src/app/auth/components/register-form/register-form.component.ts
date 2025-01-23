import { Component, EventEmitter, Input, Output, output } from '@angular/core';
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
import { Register } from '../../../api/auth';

@Component({
  selector: 'register-form-component',
  imports: [ReactiveFormsModule, InputComponent, ButtonComponent],
  templateUrl: './register-form.component.html',
  styles: `
    :host {
      display: block;
    }
`,
})
export class RegisterFormComponent {
  protected passwordInputType: inputTypes = 'password';
  protected registerForm!: FormGroup;
  @Input() loading: boolean = false;
  @Output('goToLogin') eventGoToLogin: EventEmitter<void> = new EventEmitter();
  @Output('toRegister') eventToRegister: EventEmitter<Register> =
    new EventEmitter();

  constructor(private _fb: FormBuilder) {
    this.initForm();
  }

  private initForm() {
    this.registerForm = this._fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
    });
  }

  changeTypeInputPassword() {
    this.passwordInputType =
      this.passwordInputType === 'password' ? 'text' : 'password';
  }

  register() {
    this.eventToRegister.emit(this.registerForm.value);
  }
}
