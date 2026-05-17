import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () =>
      import('./features/home.component').then((m) => m.HomeComponent),
  },

  {
    path: 'menu',
    loadComponent: () =>
      import('./features/menu.component').then((m) => m.MenuComponent),
  },
  {
    path: 'menu/:id',
    outlet: 'modal',
    loadComponent: () =>
      import('./features/pizza-detail.component').then(
        (m) => m.PizzaDetailComponent
      ),
  },
  {
    path: 'menu/:id',
    loadComponent: () =>
      import('./features/pizza-detail-page.component').then(
        (m) => m.PizzaDetailPageComponent
      ),
  },

  {
    path: 'cart',
    outlet: 'modal',
    loadComponent: () =>
      import('./features/cart.component').then((m) => m.CartComponent),
  },

  {
    path: '404',
    loadComponent: () =>
      import('./core/filenotfound.component').then(
        (m) => m.FilenotfoundComponent
      ),
  },
  { path: '**', redirectTo: '404' },
];
