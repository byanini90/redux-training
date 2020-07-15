import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { reset } from '../contador.actions';

@Component({
  selector: 'app-nieto',
  templateUrl: './nieto.component.html',
  styleUrls: ['./nieto.component.scss']
})
export class NietoComponent implements OnInit {

  contador: number;
  
  // SIN NgRx
  // @Input() contador: number;
  // @Output() resetearContador: EventEmitter<number>= new EventEmitter<number>();

  constructor(private store: Store<AppState>) {
    this.store.select('contador')
      .subscribe(contador => this.contador = contador)
  }

  ngOnInit(): void {
  }

  reset() {
    this.store.dispatch(reset());
  }

  // SIN NgRx
  // reset() {
  //   this.contador = 0;
  //   this.resetearContador.emit(0);
  // }

}
