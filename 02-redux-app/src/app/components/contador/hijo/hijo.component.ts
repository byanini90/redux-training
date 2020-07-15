import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { multiplicar, dividir } from '../contador.actions';

@Component({
  selector: 'app-hijo',
  templateUrl: './hijo.component.html',
  styleUrls: ['./hijo.component.scss']
})
export class HijoComponent implements OnInit {

  contador: number;
  // SIN NgRx
  // @Input() contador: number;
  // @Output() actualizarContador: EventEmitter<number>= new EventEmitter<number>();

  constructor(private store: Store<AppState>) {
    this.store.select('contador')
      .subscribe(contador => this.contador = contador)
  }

  ngOnInit(): void {
  }

  multiplicar() {
    this.store.dispatch(multiplicar({numero: 3}));
  }

  dividir() {
    this.store.dispatch(dividir({numero: 5}));
  }

// SIN NgRx
  // multiplicar() {
  //   this.contador *= 2;
  //   this.actualizarContador.emit(this.contador);
  // }

  // dividir() {
  //   this.contador /= 2;
  //   this.actualizarContador.emit(this.contador);
  // }

  // resetearContador($event) {
  //   this.actualizarContador.emit($event);
  // }

}
