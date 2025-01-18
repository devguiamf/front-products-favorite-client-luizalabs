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
      token: '',
      user: {
        name: '',
        email: ''
      }
    })
  }

  registerAPI(credentials: Register): Observable<void>{
    return of();
  }

  

  
}
