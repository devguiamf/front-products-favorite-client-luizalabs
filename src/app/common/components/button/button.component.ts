import { CommonModule } from '@angular/common';
import { Component, input, InputSignal, output } from '@angular/core';

@Component({
  selector: 'button-component',
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styles: `
    :host {
      display: block;
    }
  `
})
export class ButtonComponent {
  type: InputSignal<'button' | 'submit'> = input.required();
  isDisabled: InputSignal<boolean> = input(false); 
  click = output({alias: 'click'});
}
