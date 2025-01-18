import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserSessionService } from '../../services/user-session/user-session.service';
import { ROUTE_KEYS } from '../../../app.routes';

@Component({
  selector: 'header-component',
  imports: [RouterLink],
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit{

  protected loginRoute: string = ROUTE_KEYS.auth;
  protected productsRoute: string = ROUTE_KEYS.products;
  protected favoritesRoute: string = ROUTE_KEYS.favorites;

  protected isLogged: boolean = false;
  userSessionService = inject(UserSessionService);

  ngOnInit(): void {
    // this.isLogged = this.userSessionService.isUserLogged()
  }
}
