import { Routes } from '@angular/router';
import { HomeComponent } from './features/home.component';
import { MenuComponent } from './features/menu.component';
import { FilenotfoundComponent } from './core/filenotfound.component';
import { CartComponent } from './features/cart.component';
import { PizzaDetailComponent } from './features/pizza-detail.component';
import { PizzaDetailPageComponent } from './features/pizza-detail-page.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },

  { path: 'menu', component: MenuComponent },
  { path: 'menu/:id', component: PizzaDetailComponent, outlet: 'modal' },
  { path: 'menu/:id', component: PizzaDetailPageComponent },

  { path: 'cart', component: CartComponent, outlet: 'modal' },

  { path: '404', component: FilenotfoundComponent },
  { path: '**', redirectTo: '404' },
];
