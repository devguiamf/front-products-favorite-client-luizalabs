import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'header-component',
  imports: [RouterLink],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  protected login_route: string = '/auth';
}
