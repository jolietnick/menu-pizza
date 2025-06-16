import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { MenuItem } from '../models/menu-item.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="card h-100 shadow"
      (click)="goToDetails()"
      style="cursor:pointer;"
    >
      <img [src]="item.image" class="card-img-top" [alt]="item.name" />
      <div class="card-body">
        <h5 class="card-title">{{ item.name }}</h5>
        <p class="card-text text-muted mb-2">{{ item.description }}</p>
        <p class="card-text card-price text-center">€{{ item.price }}</p>

        <div
          class="d-flex justify-content-between align-items-center border rounded p-2 bg-light"
        >
          <button
            class="btn btn-outline-danger px-3"
            (click)="onRemove(); $event.stopPropagation()"
            [disabled]="item.quantity === 0"
          >
            -
          </button>
          <p class="mb-0 fs-5">{{ item.quantity }}</p>
          <button
            class="btn btn-outline-success px-3"
            (click)="onAdd(); $event.stopPropagation()"
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
  @Input() item!: MenuItem;

  @Output() increase = new EventEmitter<MenuItem>();
  @Output() decrease = new EventEmitter<MenuItem>();
  @Output() removeItem = new EventEmitter<MenuItem>();

  private readonly router = inject(Router);

  goToDetails(): void {
    this.router.navigate([{ outlets: { modal: ['menu', this.item.id] } }]);
  }

  onAdd(): void {
    this.increase.emit(this.item);
  }
  onRemove(): void {
    this.decrease.emit(this.item);
  }
  onDelete(): void {
    this.removeItem.emit(this.item);
  }
}
