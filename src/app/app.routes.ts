import { Routes } from '@angular/router';

export enum ROUTE_KEYS {
    home = 'home',
    auth = 'auth'
} 

export const routes: Routes = [
    {
        path: '',
        redirectTo: ROUTE_KEYS.home,
        pathMatch: 'full'
    },
    {
        path: ROUTE_KEYS.home,
        title: 'Home',
        loadComponent: () => import('./template/template.component').then(c => c.TemplatePage)
    },
    {
        path: ROUTE_KEYS.auth,
        title: 'Entrar / Registrar',
        loadComponent: () => import('./auth/auth.page').then(c => c.AuthPage)
    }
];
