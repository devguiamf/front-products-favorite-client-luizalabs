import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        title: 'Home',
        loadComponent: () => import('./template/template.component').then(c => c.TemplateComponent)
    },
    {
        path: 'login',
        title: 'Entrar',
        loadComponent: () => import('./auth/login/login.component').then(c => c.LoginComponent)
    }
];
