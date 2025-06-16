import { Component, effect, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MenuService } from '../services/menu.service';
import { MenuItem } from '../models/menu-item.model';

@Component({
  selector: 'app-pizza-detail-page',
  imports: [CommonModule],
  template: `
    <div class="container py-4">
      <ng-container *ngIf="menu().length === 0; else loaded">
        <div
          class="d-flex justify-content-center align-items-center"
          style="height:200px;"
        >
          <div class="spinner-border text-danger" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      </ng-container>
      <ng-template #loaded>
        <ng-container *ngIf="pizza; else notFound">
          <div class="container">
            <h2 class="mb-3 text-danger">{{ pizza.name }}</h2>
            <img
              [src]="pizza.image"
              [alt]="pizza.name"
              class="img-fluid mb-3 rounded"
              style="max-height:500px; object-fit:cover;"
            />
            <p class="card-text fs-2 text-muted mb-2">{{ pizza.description }}</p>
            <p class="card-price fs-2">€{{ pizza.price }}</p>
          </div>
        </ng-container>
        <ng-template #notFound>
          <p>Mamma mia! We don't do this pizza, my friend</p>
        </ng-template>
      </ng-template>

      <button
        type="button"
        class="btn btn-success btn-lg mb-5"
        (click)="goBack()"
      >
        ◄ Go back to menu
      </button>
    </div>

    <button
      class="cart-tab"
      (click)="openCart()"
      *ngIf="menuService.totalQuantity() > 0"
    >
      Cart ({{ menuService.totalQuantity() }})
    </button>
  `,
  styles: [`
    h2 {
      font-size: 3rem;
    }
    `],
})
export class PizzaDetailPageComponent {
  private readonly route = inject(ActivatedRoute);
  readonly menuService = inject(MenuService);
  private readonly router = inject(Router);

  readonly menu = this.menuService.getMenu();
  pizza?: MenuItem;

  constructor() {
    effect(() => {
      const id = Number(this.route.snapshot.paramMap.get('id'));
      const menu = this.menuService.getMenu()();
      this.pizza = menu.find((p) => p.id === id);
    });
  }

  goBack(): void {
    this.router.navigateByUrl('/menu');
  }

  openCart() {
    this.router.navigate([{ outlets: { modal: 'cart' } }]);
  }
}
