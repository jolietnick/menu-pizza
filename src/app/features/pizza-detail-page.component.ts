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
      <button type="button" class="btn btn-danger btn-lg" (click)="goBack()">
        Go back to menu
      </button>
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
          <h2 class="mb-3">{{ pizza.name }}</h2>
          <img
            [src]="pizza.image"
            [alt]="pizza.name"
            class="img-fluid mb-3"
            style="max-height:250px; object-fit:cover;"
          />
          <p class="card-text text-muted mb-2">{{ pizza.description }}</p>
          <p class="card-price text-center">€{{ pizza.price }}</p>
        </ng-container>
        <ng-template #notFound>
          <p>Mamma mia! We don't do this pizza, my friend</p>
        </ng-template>
      </ng-template>
    </div>
    <button
      class="cart-tab"
      (click)="openCart()"
      *ngIf="menuService.totalQuantity() > 0"
    >
      Cart ({{ menuService.totalQuantity() }})
    </button>
  `,
  styles: [``],
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
