import { Routes } from '@angular/router';

export enum ROUTE_KEYS {
    home = 'home',
    auth = 'auth',
    favorites = 'favorites',
    products = 'products'
} 

export const routes: Routes = [
    {
        path: '',
        redirectTo: ROUTE_KEYS.home,
        pathMatch: 'full'
    },
    {
        path: ROUTE_KEYS.auth,
        title: 'Entrar / Registrar',
        loadComponent: () => import('./auth/auth.page').then(c => c.AuthPage)
    },
    {
        path: ROUTE_KEYS.home,
        title: 'Home',
        loadComponent: () => import('./template/template.component').then(c => c.TemplatePage),
        children: [
            {
                path: '',
                redirectTo: ROUTE_KEYS.products,
                pathMatch: 'full'
            },
            {
                path: ROUTE_KEYS.products,
                title: 'Produtos',
                loadComponent: () => import('./products/products.page').then(c => c.ProductsPage)
            },
            {
                path: ROUTE_KEYS.favorites,
                title: 'Favoritos',
                loadComponent: () => import('./favorites/favorites.page').then(c => c.FavoritesPage)
            }
        ]
    }
];
