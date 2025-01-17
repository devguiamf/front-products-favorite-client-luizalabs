import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

type NavLinks = {
  label: string;
  url: string;
  icon?: string;
}

@Component({
  selector: 'header-component',
  imports: [RouterLink],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  protected login_route: string = '/login';
  protected register_route: string = '/register';

}
