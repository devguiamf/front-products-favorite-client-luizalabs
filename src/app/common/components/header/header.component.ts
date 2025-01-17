import { Component } from '@angular/core';

type NavLinks = {
  label: string;
  url: string;
  icon?: string;
}

@Component({
  selector: 'header-component',
  imports: [],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
}
