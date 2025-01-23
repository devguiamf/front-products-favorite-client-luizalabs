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
    id: string;
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

  getStorageItem<T>(key: string): T | null {
    try {
      const serializedValue = localStorage.getItem(key);
      return serializedValue ? (JSON.parse(serializedValue) as T) : null;
    } catch (error) {
      console.error('Error reading from storage', error);
      return null;
    }
  }

  private setStorageItem(key:string, value: any){
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
      sessionStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error('Error saving to storage', error);
    }
  }

  private removeStorageItem(key: string){
    localStorage.removeItem(key);
    sessionStorage.removeItem(key);
  }

  private clearSessionStorage(): void {
    sessionStorage.clear();
  }

  setUserSession(auth: Auth){
    this.setStorageItem(USER_SESSION_KEYS.token_key, auth.token.trim());
    this.setStorageItem(USER_SESSION_KEYS.user_key, auth.user)
  }

  isUserLogged(){
    const infoSession = this.getStorageItem(USER_SESSION_KEYS.token_key);
    if(!infoSession) return false;
    return true;
  }

  get userId(): string  {
    return this.getStorageItem<Auth['user']>(USER_SESSION_KEYS.user_key)?.id as string; 
  }

  logoutSessionUser(){
    this.removeStorageItem(USER_SESSION_KEYS.token_key);
    this.removeStorageItem(USER_SESSION_KEYS.user_key);
    this.clearSessionStorage();
    this.router.navigate(['/' + ROUTE_KEYS.auth])
  }
}
