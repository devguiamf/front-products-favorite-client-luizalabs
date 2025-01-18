import { Component, input, InputSignal } from '@angular/core';

@Component({
  selector: 'error-message-component',
  imports: [],
  template: `<p class="text-sm text-red-500">{{ message() }}</p>`,
  styles: `
    :host {
      display: block
    }
  `
})
export class ErrorMessageComponent {
  message: InputSignal<string> = input.required()
}
