import { inject, Injectable } from '@angular/core';
import { Login, LoginApiResponse, Register } from '../../api/auth';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  http = inject(HttpClient);
  api_client = environment.api_client;

  constructor() { }

  loginAPI(credentials: Login): Observable<LoginApiResponse>{
    return this.http.post<LoginApiResponse>(`${environment.api_client}/auth`, credentials)
  }

  registerAPI(credentials: Register): Observable<void>{
    return this.http.post<void>(`${environment.api_client}/register`, credentials)
  }
  
}
