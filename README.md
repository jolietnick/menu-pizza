# MenuPizza

## English 
This is my Angular Final for the Steve Jobs Academy. It's just a simple project with a single-page application that simulates an online pizzeria menu, which I called it **"Nick's Pizza"**. 

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.14.


## What it does

* **Home** – hero section with a call-to-action button that leads to the menu.  
* **Menu** – grid of pizza cards with picture, price and short description.  
* **Card actions** – increase, decrease or remove quantity; the running total is kept in a cart badge.  
* **Cart** – opens as a modal; shows chosen items with price and quantity, totals, clear, close (and keep shopping) and buy buttons.  
* **Pizza detail** – each card is clickable; a modal shows the larger image and full description.
* **Cart** – opens as a modal; shows chosen items with price and quantity, totals, clear, close (and keep shopping) and buy buttons. Cart content is saved locally so it persists when reloading pages.
* **Pizza detail** – each card is clickable; a modal shows the larger image and full description.
* **Full detail page** – navigate to `/menu/:id` for a dedicated page showing the pizza details.
* **404 page** – simple fallback for unknown routes.
* **Navbar and Footbar Components** - standalone components. The navbar has a logo, a title and the three requested routes (Home, Menu, Cart), while the footbar is really just a cute placeholder. 

All modals use a secondary Angular router outlet, so the URL reflects the open dialog and can be shared or closed by routing.

## Data source
* **REST API** – pizzas are loaded from  
  `https://my-json-server.typicode.com/zoelounge/menupizza/cards`.
* **Custom descriptions** – the app overrides API descriptions with customized, hardcoded ones.

## Run locally

```bash
git clone https://github.com/jolietnick/menu-pizza.git
cd menu-pizza
npm install
npm start            # opens http://localhost:4200
```

## Italiano
Questo è il mio progetto finale di Angular per la Steve Jobs Academy: una single-page application che simula il menu online di una pizzeria, che ho chiamato **"Nick's Pizza"**.

Il progetto è stato generato con [Angular CLI](https://github.com/angular/angular-cli) versione 19.2.14.

## Funzionalità

* **Home** – sezione introduttiva con pulsante che porta al menu.  
* **Menu** – griglia di card con foto, prezzo e descrizione breve di ogni pizza.  
* **Azioni sulla card** – pulsanti per aumentare, diminuire o azzerare la quantità; il totale corrente appare in una badge carrello.  
* **Carrello** – si apre come modale; mostra gli articoli scelti con prezzo e quantità, il totale, pulsanti per svuotare, chiudere (e continuare gli acquisti) o confermare l’ordine.  
* **Dettaglio pizza** – cliccando su una card si apre un modale con immagine ingrandita, prezzo e descrizione.  
* **Pagina 404** – vista di fallback per rotte inesistenti.
* **Navbar e Footbar** – componenti standalone; la navbar contiene un logo, titolo e le tre rotte richieste (Home, Menu, Carrello), mentre il footbar è solo un piccolo placeholder carino. 

Le modali sfruttano un outlet secondario del router Angular, quindi l’URL indica quale dialog è aperto e può essere condiviso o chiuso tramite routing.

## Fonte dei dati
* **REST API** – Le pizze sono caricate da:  
  `https://my-json-server.typicode.com/zoelounge/menupizza/cards`.
* **Descrizioni personalizzate** – L'app sovrascrive le descrizioni fornite dall'API con descrizioni personalizzate hardcoded.

## Avvio in locale

```bash
git clone https://github.com/jolietnick/menu-pizza.git
cd menu-pizza
npm install
npm start            # apre http://localhost:4200
```
