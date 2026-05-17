import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav class="navbar navbar-expand-md bg-light sticky-top">
      <a class="navbar-brand" routerLink="home">
        <img
          ngSrc="/assets/logo_nick.png"
          width="73"
          height="100"
          alt="Nick's Pizza Logo"
          class="navbar-logo d-inline-block"
        />
        Nick's Pizza
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a
              class="nav-link p-1"
              aria-current="page"
              routerLink="home"
              routerLinkActive="active"
              >Home</a
            >
          </li>
          <li class="nav-item">
            <a class="nav-link p-1" routerLink="menu" routerLinkActive="active"
              >Menu</a
            >
          </li>

          <li class="nav-item">
            <a
              class="nav-link p-1"
              [routerLink]="[{ outlets: { modal: ['cart'] } }]"
            >
              Cart
            </a>
          </li>
        </ul>
      </div>
    </nav>
  `,
  styles: `
  .navbar-brand {
    font-family: "Mistral";
    font-size: 2.5rem;
  }
  .navbar-logo {
    width: 73px;
    height: auto;
  }
  .nav-link.active {
  background-color: 	#DC3545 !important;
  color: white !important;
  font-weight: bold;
  border-radius: 25%;
}
.nav-item {
  margin-right: 20px;}`,
})
export class NavbarComponent {}
