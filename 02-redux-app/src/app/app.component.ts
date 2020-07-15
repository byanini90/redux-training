import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as actions from './components/contador/contador.actions';
import { AppState } from './app.reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'redux-app';

  contador: number;

  constructor(private store: Store<AppState>) {
    // SIN NGRXthis.contador = 10;
    this.store.select('contador').subscribe(contador => {
      this.contador = contador;
    })
  }

  incrementar() {
    this.store.dispatch(actions.incrementar());
  }

  decrementar() {
    this.store.dispatch(actions.decrementar());
  }

  // SIN NGRX
  // incrementar() {
  //   this.contador++;
  // }

  // decrementar() {
  //   this.contador--;
  // }

s
}
