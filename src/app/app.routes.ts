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
        loadComponent: () => import('./template/template.component').then(c => c.TemplatePage)
    },
    {
        path: 'auth',
        title: 'Entrar / Registrar',
        loadComponent: () => import('./auth/auth.page').then(c => c.AuthPage)
    }
];
