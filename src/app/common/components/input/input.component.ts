import { Component, inject, Input, input, InputSignal } from '@angular/core';
import { ControlValueAccessor, FormsModule, NgControl } from '@angular/forms';

export type inputTypes = 'text' | 'password' | 'email';

@Component({
  selector: 'input-component',
  imports: [FormsModule],
  templateUrl: './input.component.html',
  styles: `
    :host {
      display: block;
    }
  `
})
export class InputComponent implements ControlValueAccessor {
  private ngControl = inject(NgControl, { optional: true });
  protected onTouched? = () => {};
  protected onChange? = (_: string) => {};

  protected inputValue: string = '';
  protected isDisabled: boolean = false;

  @Input() label: string = '';
  @Input() type: inputTypes = 'text';

  constructor() {
    if (this.ngControl) this.ngControl.valueAccessor = this;
  }

  writeValue(value: string): void {
    this.inputValue = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}
