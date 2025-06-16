import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-home',
  imports: [RouterLink],
  template: `
    <div class="container-fluid p-0">
      <div
        class="hero-section d-flex align-items-center justify-content-center text-white text-center"
      >
        <div class="overlay p-4 rounded">
          <img src="assets/logo_nick.png" alt="Logo" class="mb-4" />
          <h1 class="display-1">Nick's Pizza</h1>
          <p class="lead">Tradizione & Gusto Autentico</p>
        </div>
      </div>
    </div>
    <div class="container mt-5 welcome-section">
      <h2 class="text-center mb-4">
        Benvenuti da Nick's Pizza, your pizza place everywhere in the world!
      </h2>
      <p class="lead text-center">
        We make sourdough pizza with the best ingredients, using traditional
        methods and a touch of love. Whether you're in Italy or anywhere else in
        the world, our pizzas are crafted to bring you the authentic taste of
        Italy.
      </p>

      <p class="text-center">
        Our neighbourhood pizzerias leave lots of space for walk-ins, and always
        will do. We also take bookings, to give you the best of both worlds.
        Whatever your plans, we're ready to greet you with a warm welcome and
        piping hot pizza!
      </p>

      <div class="text-center">
        <a routerLink="/menu" class="btn btn-danger btn-lg">Scopri il Menu</a>
      </div>

    </div>
  `,
  styles: `
.hero-section .overlay {
  background-color: rgba(0, 0, 0, 0.5);
}

.hero-section p {
  font-size: 1.5rem;
}

.welcome-section p {
  font-size: 1.2rem;
}

.hero-section {
  background-image: url('/assets/pizza1.jpg');
  height: 100vh;
  background-size: cover;
  background-position: center;
}

.overlay img {
  width: 300px;
}
`,
})
export class HomeComponent {}
