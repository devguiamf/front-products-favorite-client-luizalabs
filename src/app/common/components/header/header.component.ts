import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserSessionService } from '../../services/user-session/user-session.service';

@Component({
  selector: 'header-component',
  imports: [RouterLink],
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit{

  protected login_route: string = '/auth';
  protected isLogged: boolean = false;
  userSessionService = inject(UserSessionService);

  ngOnInit(): void {
    this.isLogged = this.userSessionService.isUserLogged()
  }
}
