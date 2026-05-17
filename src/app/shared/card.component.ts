import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
} from '@angular/core';
import { MenuItem } from '../models/menu-item.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="card h-100 shadow"
      role="button"
      tabindex="0"
      (click)="goToDetails()"
      (keydown.enter)="goToDetails()"
      (keydown.space)="goToDetails(); $event.preventDefault()"
      style="cursor:pointer;"
      [attr.aria-label]="'Open details for ' + item().name"
    >
      <img [src]="item().image" class="card-img-top" [alt]="item().name" />
      <div class="card-body">
        <h5 class="card-title">{{ item().name }}</h5>
        <p class="card-text text-muted mb-2">{{ item().description }}</p>
        <p class="card-text card-price text-center">€{{ item().price }}</p>

        <div
          class="d-flex justify-content-between align-items-center border rounded p-2 bg-light"
        >
          <button
            class="btn btn-outline-danger px-3"
            (click)="onRemove(); $event.stopPropagation()"
            [disabled]="item().quantity === 0"
            [attr.aria-label]="'Decrease quantity for ' + item().name"
          >
            -
          </button>
          <p class="mb-0 fs-5">{{ item().quantity }}</p>
          <button
            class="btn btn-outline-success px-3"
            (click)="onAdd(); $event.stopPropagation()"
            [attr.aria-label]="'Increase quantity for ' + item().name"
          >
            +
          </button>
        </div>

        <button
          class="btn btn-warning mt-4 d-block mx-auto"
          (click)="onDelete(); $event.stopPropagation()"
        >
          Remove from cart
        </button>
      </div>
    </div>
  `,
  styles: ``,
})
export class CardComponent {
  readonly item = input.required<MenuItem>();

  readonly increase = output<MenuItem>();
  readonly decrease = output<MenuItem>();
  readonly removeItem = output<MenuItem>();

  private readonly router = inject(Router);

  goToDetails(): void {
    this.router.navigate([{ outlets: { modal: ['menu', this.item().id] } }]);
  }

  onAdd(): void {
    this.increase.emit(this.item());
  }
  onRemove(): void {
    this.decrease.emit(this.item());
  }
  onDelete(): void {
    this.removeItem.emit(this.item());
  }
}
