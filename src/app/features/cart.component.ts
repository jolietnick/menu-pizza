// src/app/features/cart.component.ts
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService } from '../services/menu.service';

@Component({
  selector: 'app-cart',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Alert di successo -->
    @if (showSuccess()) {
      <div
        class="alert alert-success position-fixed start-50 top-50 translate-middle-x"
        role="alert"
      >
        Thanks for your order! Piping hot pizzas are on their way!
      </div>
    }

    <!-- Modal del carrello -->
    @if (isModalOpen()) {
      <div
        class="modal fade show d-block"
        id="cartModal"
        tabindex="-1"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cartModalLabel"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title" id="cartModalLabel">Your Check</h4>
              <button
                type="button"
                class="btn-close"
                aria-label="Close cart"
                (click)="closeModal()"
              ></button>
            </div>
            <div class="modal-body">
              @if (menuService.cartItems().length > 0) {
                <ul class="list-group">
                  @for (item of menuService.cartItems(); track item.id) {
                    <li
                      class="list-group-item d-flex justify-content-between align-items-center"
                    >
                      <span class="cart-subtotal-item">{{ item.name }}</span>
                      <span class="cart-subtotal-prices">
                        ({{ item.quantity }} x €{{ item.price.toFixed(2) }})
                      </span>
                      <span class="cart-subtotal">
                        €{{ (item.quantity * item.price).toFixed(2) }}
                      </span>
                    </li>
                  }
                </ul>
                <p class="mt-3 text-end">
                  <strong>Totale: €{{ menuService.totalPrice().toFixed(2) }}</strong>
                </p>
              } @else {
                <p class="text-center">Your cart is empty</p>
              }
            </div>
            <div class="modal-footer">
              <button
                class="btn btn-danger"
                (click)="clearCart()"
                [disabled]="menuService.cartItems().length === 0"
              >
                Clear Cart
              </button>
              <button class="btn btn-secondary" (click)="closeModal()">
                Close
              </button>
              <button
                class="btn btn-success"
                (click)="buy()"
                [disabled]="menuService.cartItems().length === 0"
              >
                Buy
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-backdrop fade show" (click)="closeModal()"></div>
    }
  `,
  styles: [
    `
      .alert {
        z-index: 1060;
        margin-top: 1rem;
        width: fit-content;
        padding: 1rem;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      }

      .cart-subtotal-item {
        color: #dc3545
      }
      .cart-subtotal-prices {
        color: #6c757d;
        font-size: 1.2rem;
      }

    `,
  ],
})
export class CartComponent {
  readonly menuService = inject(MenuService);
  private readonly router = inject(Router);

  menu = this.menuService.getMenu();

  showSuccess = signal(false);
  isModalOpen = signal(true);

  clearCart() {
    this.menuService.clearMenu();
  }

  closeModal() {
    this.isModalOpen.set(false);
    this.router.navigate([{ outlets: { modal: null } }]);
  }

  buy() {
    this.showSuccess.set(true);

    setTimeout(() => {
      this.clearCart();
      this.showSuccess.set(false);
      this.closeModal();
      this.router.navigateByUrl('/menu');
    }, 3000);
  }
}
