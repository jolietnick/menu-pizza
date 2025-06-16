import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './core/navbar.component';
import { FooterComponent } from "./core/footer.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  template: `
    <div class="container"><app-navbar></app-navbar></div>

    <router-outlet />
    <router-outlet name="modal" />
    <app-footer />
  `,
  styles: [],
})
export class AppComponent {
  title = "Nick's Pizza";
}
