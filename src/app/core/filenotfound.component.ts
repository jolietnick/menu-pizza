import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-filenotfound',
  imports: [RouterLink],
  template: `
    <div class="container-fluid p-0">
      <div
        class="not-found d-flex align-items-center justify-content-center text-white text-center"
        style="background-image: url('assets/pizza2.jpg'); height: 100vh; background-size: cover; background-position: center;"
      >
        <div class="overlay p-4 rounded">
          <h1 class="display-1">404</h1>
          <p class="lead">Uh-oh! How did you end up here?</p>
          <a
            routerLink="/home"
            class="btn btn-danger btn-lg"
            >Head back</a
          >
        </div>
      </div>
    </div>
  `,
  styles: `.not-found .overlay {
    background-color: rgba(0, 0, 0, 0.5);
  }

  .not-found h1 {
    font-size: 4rem;
    font-family: 'Mistral', serif;
  }

  .not-found p {
    font-size: 1.5rem;
  }`,
})
export class FilenotfoundComponent {}
