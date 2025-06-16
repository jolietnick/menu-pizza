// menu.component.ts
import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../shared/card.component';
import { MenuItem } from '../models/menu-item.model';
import { MenuService } from '../services/menu.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-menu',
  imports: [CommonModule, CardComponent],
  template: `
    <div class="container">
      <h1 class="text-center my-5 text-danger">Menu</h1>

      <div class="row">
        <div
          class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
          *ngFor="let item of menu()"
        >
          <app-card
            [item]="item"
            (increase)="increase(item)"
            (decrease)="decrease(item)"
            (removeItem)="remove(item)"
          ></app-card>
        </div>
      </div>

      <button
        class="cart-tab"
        (click)="openCart()"
        *ngIf="menuService.totalQuantity() > 0"
      >
        Cart ({{ menuService.totalQuantity() }})
      </button>
    </div>
  `,
  styles: [``],
})
export class MenuComponent {
  readonly menuService = inject(MenuService);
  readonly router = inject(Router);
  readonly route = inject(ActivatedRoute);

  menu = this.menuService.getMenu();

  constructor() {}

  openCart() {
    this.router.navigate([{ outlets: { modal: 'cart' } }]);
  }

  increase(item: MenuItem) {
    this.menuService.updateMenu(item, 'increase');
  }

  decrease(item: MenuItem) {
    this.menuService.updateMenu(item, 'decrease');
  }

  remove(item: MenuItem) {
    this.menuService.updateMenu(item, 'remove');
  }
}
