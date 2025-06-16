import { Component, effect, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MenuService } from '../services/menu.service';
import { MenuItem } from '../models/menu-item.model';

@Component({
  selector: 'app-pizza-detail',
  imports: [CommonModule],
  template: `
    <div
      class="modal fade show d-block"
      style="background: rgba(0,0,0,.5); z-index:1060"
      (click)="close()"
    >
      <div
        class="modal-dialog"
        (click)="$event.stopPropagation()"
        style="max-width:500px;"
      >
        <div class="modal-content p-4 rounded">
          <button
            type="button"
            class="btn-close ms-auto"
            aria-label="Close"
            (click)="close()"
          ></button>

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
              <div class="text-center mt-3">
                <button
                  type="button"
                  class="btn btn-danger btn-lg w-100"
                  (click)="openFullPage(pizza.id.toString())"
                >
                  Open Full Page
                </button>
              </div>
            </ng-container>

            <ng-template #notFound>
              <p>Mamma mia! We don't do this pizza, my friend</p>
            </ng-template>
          </ng-template>
        </div>
      </div>
    </div>

    <div class="modal-backdrop fade show"></div>
  `,
  styles: [
    `
      .modal-content {
        border-radius: 1rem;
      }
      .modal-dialog {
        max-width: 500px;
      }
      .btn-close {
        position: absolute;
        top: 1rem;
        right: 1rem;
      }
      .card-price {
        font-family: 'Mistral', serif;
        font-size: 1.5rem;
        font-weight: bold;
        color: #dc3545;
        letter-spacing: 0.1em;
      }
    `,
  ],
})
export class PizzaDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly menuService = inject(MenuService);
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

  close(): void {
    this.router.navigate([{ outlets: { modal: null } }]);
  }

  openFullPage(pizzaId: string) {
    this.close();
    this.router.navigateByUrl(`/menu/${pizzaId}`);
  }
}
