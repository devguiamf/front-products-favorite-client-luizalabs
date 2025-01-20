import { CommonModule } from '@angular/common';
import { Component, Input, output } from '@angular/core';

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
  @Input() type: 'button' | 'submit' = 'button';
  @Input() isDisabled: boolean = false; 
  @Input() color: 'primary' | 'danger' = 'primary';

  get isPrimary() {
    return this.color === 'primary';
  }
}
