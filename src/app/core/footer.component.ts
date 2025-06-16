import {Component} from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <footer class="text-center mt-5">
      <p>&copy; {{ currentYear }} Nick's Pizza for Steve Jobs Academy</p>

    </footer>
  `,
  styles: `
    footer {
      background-color: #dc3545;
      color: white;
      height : auto;
      padding: 10px;
      width: 100%;
    }
  `
})

export class FooterComponent {
  currentYear: number;

  constructor() {
    this.currentYear = new Date().getFullYear();
  }
}
