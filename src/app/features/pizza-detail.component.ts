import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuService } from '../services/menu.service';

@Component({
  selector: 'app-pizza-detail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="modal fade show d-block"
      style="background: rgba(0,0,0,.5); z-index:1060"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pizzaDetailTitle"
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

          @if (menu().length === 0) {
            <div
              class="d-flex justify-content-center align-items-center"
              style="height:200px;"
            >
              <div class="spinner-border text-danger" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
          } @else {
            @if (pizza(); as selectedPizza) {
              <h2 class="mb-3" id="pizzaDetailTitle">{{ selectedPizza.name }}</h2>
              <img
                [src]="selectedPizza.image"
                [alt]="selectedPizza.name"
                class="img-fluid mb-3"
                style="max-height:250px; object-fit:cover;"
              />
              <p class="card-text text-muted mb-2">{{ selectedPizza.description }}</p>
              <p class="card-price text-center">€{{ selectedPizza.price }}</p>
              <div class="text-center mt-3">
                <button
                  type="button"
                  class="btn btn-danger btn-lg w-100"
                  (click)="openFullPage(selectedPizza.id.toString())"
                >
                  Open Full Page
                </button>
              </div>
            } @else {
              <p>Mamma mia! We don't do this pizza, my friend</p>
            }
          }
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
  readonly pizza = computed(() => {
      const id = Number(this.route.snapshot.paramMap.get('id'));
      return this.menu().find((p) => p.id === id);
  });

  close(): void {
    this.router.navigate([{ outlets: { modal: null } }]);
  }

  openFullPage(pizzaId: string) {
    this.close();
    this.router.navigateByUrl(`/menu/${pizzaId}`);
  }
}
