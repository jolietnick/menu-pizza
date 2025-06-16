import { computed, Injectable, signal, effect } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MenuItem } from '../models/menu-item.model';
import { map, Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MenuService {
  private url = 'https://my-json-server.typicode.com/zoelounge/menupizza/cards';
  private menu = signal<MenuItem[]>([]);

  /* Dato che le descrizioni nella REST API erano tutte uguali eccetto che per il nome,
  ho creato un oggetto con le descrizioni personalizzate per ogni
  pizza anche per avere diverse lunghezze di descrizione e vedere
  come si comporta il layout in questo caso */
  private customDescriptions: { [key: string]: string } = {
    Margherita:
      'San Marzano tomato sauce, buffalo mozzarella DOP, EVO oil and fresh basil leaves for the Queen of pizzas.',
    Diavola:
      'A fiery San Marzano tomato sauce with red pepper flakes from Calabria, original Ventricina salami from Abruzzo, and fior di latte mozzarella. A very spicy pizza for very spicy people!',
    Marinara:
      'San Marzano tomato sauce, Piennolo del Vesuvio DOP tomatoes, garlic herb oil, organic oregano, extra virgin olive oil. The original pizza, the one that started it all in Naples.',
    Bottarga:
      'A white pizza with fior di latte mozzarella, cured mullet roe (bottarga di muggine), and a drizzle of extra virgin olive oil. A delicacy from Sardinia for refined palates.',
    'Frutti di mare':
      "A seafood lover's dream with fior di latte mozzarella, king prawns, mussels from Messina and calamari, all on a bed of San Marzano tomato sauce. A taste of the sea on your pizza.",
  };

  public readonly cartItems = computed(() =>
    this.menu().filter((item) => item.quantity > 0)
  );
  public readonly totalQuantity = computed(() =>
    this.cartItems().reduce((sum, item) => sum + item.quantity, 0)
  );
  public readonly totalPrice = computed(() =>
    this.cartItems().reduce((sum, item) => sum + item.quantity * item.price, 0)
  );

  constructor(private http: HttpClient) {
    const stored = localStorage.getItem('menu');
    if (stored) {
      try {
        this.menu.set(JSON.parse(stored) as MenuItem[]);
      } catch {
        localStorage.removeItem('menu');
      }
    }
    if (this.menu().length === 0) {
      this.fetchMenu().subscribe({
        next: (data) => this.setMenu(data),
        error: (err) => console.error('Errore caricamento menu:', err),
      });
    }

    effect(() => {
      localStorage.setItem('menu', JSON.stringify(this.menu()));
    });
  }
  fetchMenu(): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(this.url).pipe(
      map((items: MenuItem[]) =>
        items.map((item) => ({
          ...item,
          description: this.customDescriptions[item.name],
          quantity: this.menu().find((i) => i.id === item.id)?.quantity ?? 0,
        }))
      )
    );
  }

  getMenu() {
    return this.menu.asReadonly();
  }

  setMenu(items: MenuItem[]) {
    this.menu.set(items);
  }

  updateMenu(item: MenuItem, action: 'increase' | 'decrease' | 'remove') {
    this.menu.update((items) => {
      const updatedItems = items.map((i) => {
        if (i.id === item.id) {
          const newQuantity =
            action === 'increase'
              ? i.quantity + 1
              : action === 'decrease' && i.quantity > 0
              ? i.quantity - 1
              : 0;
          return { ...i, quantity: newQuantity };
        }
        return i;
      });
      return updatedItems;
    });
  }

  clearMenu() {
    this.menu.update((items) => items.map((i) => ({ ...i, quantity: 0 })));
  }
}
