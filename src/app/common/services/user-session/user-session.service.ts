import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTE_KEYS } from '../../../app.routes';

export enum USER_SESSION_KEYS {
  token_key = 'token_data',
  user_key = 'user_data'
}

export interface Auth {
  token: string;
  user: {
    name: string;
    email: string;
  }
}

@Injectable({
  providedIn: 'root'
})
export class UserSessionService {

  router = inject(Router) 

  constructor() { }

  private getStorageItem(key: string) {
    const storageItem =  localStorage.getItem(key)
    if(!storageItem) return null
    return JSON.parse(storageItem)
  }

  private setStorageItem(key:string, value: string){
    localStorage.setItem(key, value);
    sessionStorage.setItem(key, value);
  }

  private removeStorageItem(key: string){
    localStorage.removeItem(key);
    sessionStorage.removeItem(key);
  }

  private clearSessionStorage(): void {
    sessionStorage.clear();
  }

  setUserSession(auth: Auth){
    this.setStorageItem(USER_SESSION_KEYS.token_key, auth.token)
    this.setStorageItem(USER_SESSION_KEYS.user_key, JSON.stringify(auth.user))
  }

  isUserLogged(){
    const infoSession = this.getStorageItem(USER_SESSION_KEYS.token_key);
    if(!infoSession) return false;
    return true;
  }

  logoutSessionUser(){
    this.removeStorageItem(USER_SESSION_KEYS.token_key);
    this.removeStorageItem(USER_SESSION_KEYS.user_key);
    this.clearSessionStorage();
    this.router.navigate(['/' + ROUTE_KEYS.auth])
  }
}
