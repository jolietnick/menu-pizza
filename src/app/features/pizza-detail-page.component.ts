import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuService } from '../services/menu.service';

@Component({
  selector: 'app-pizza-detail-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="container py-4">
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
          <div class="container">
            <h2 class="mb-3 text-danger">{{ selectedPizza.name }}</h2>
            <img
              [src]="selectedPizza.image"
              [alt]="selectedPizza.name"
              class="img-fluid mb-3 rounded"
              style="max-height:500px; object-fit:cover;"
            />
            <p class="card-text fs-2 text-muted mb-2">{{ selectedPizza.description }}</p>
            <p class="card-price fs-2">€{{ selectedPizza.price }}</p>
          </div>
        } @else {
          <p>Mamma mia! We don't do this pizza, my friend</p>
        }
      }

      <button
        type="button"
        class="btn btn-success btn-lg mb-5"
        (click)="goBack()"
      >
        ◄ Go back to menu
      </button>
    </div>

    @if (menuService.totalQuantity() > 0) {
      <button class="cart-tab" (click)="openCart()">
        Cart ({{ menuService.totalQuantity() }})
      </button>
    }
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
  readonly pizza = computed(() => {
      const id = Number(this.route.snapshot.paramMap.get('id'));
      return this.menu().find((p) => p.id === id);
  });

  goBack(): void {
    this.router.navigateByUrl('/menu');
  }

  openCart() {
    this.router.navigate([{ outlets: { modal: 'cart' } }]);
  }
}
