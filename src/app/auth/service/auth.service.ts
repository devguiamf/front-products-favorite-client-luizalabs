import { Injectable } from '@angular/core';
import { Login, LoginApiResponse, Register } from '../../api/auth';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  loginAPI(credentials: Login): Observable<LoginApiResponse>{
    return of({
      token: '123456',
      user: {
        name: 'John Doe',
        email: 'email@email.com'
      }
    })
  }

  registerAPI(credentials: Register): Observable<void>{
    return of();
  }
  
}
