// menu.component.ts
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CardComponent } from '../shared/card.component';
import { MenuItem } from '../models/menu-item.model';
import { MenuService } from '../services/menu.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  imports: [CardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="container">
      <h1 class="text-center my-5 text-danger">Menu</h1>

      @if (menu().length === 0) {
        <div
          class="d-flex justify-content-center align-items-center"
        >
          <div
            class="spinner-border text-danger"
            style="width: 5rem; height: 5rem;"
            role="status"
          >
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      } @else {
        <div class="row">
          @for (item of menu(); track item.id) {
            <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
              <app-card
                [item]="item"
                (increase)="increase(item)"
                (decrease)="decrease(item)"
                (removeItem)="remove(item)"
              />
            </div>
          }
        </div>
      }

      @if (menuService.totalQuantity() > 0) {
        <button class="cart-tab" (click)="openCart()">
          Cart ({{ menuService.totalQuantity() }})
        </button>
      }
    </div>
  `,
  styles: [``],
})
export class MenuComponent {
  readonly menuService = inject(MenuService);
  readonly router = inject(Router);

  menu = this.menuService.getMenu();

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
