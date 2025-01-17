import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'Home',
        title: 'Home',
        loadComponent: () => import('./template/template.component').then(c => c.TemplateComponent)
    },
    {
        path: '',
        redirectTo: 'Home',
        pathMatch: 'full'
    }
];
