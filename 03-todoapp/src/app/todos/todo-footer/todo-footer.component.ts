import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { borrarCompletados } from '../todo.actions';
import { filtrosValidos, setFiltro } from '../filtro/filtro.actions';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrls: ['./todo-footer.component.css']
})
export class TodoFooterComponent implements OnInit {

  filtroActual: filtrosValidos;
  filtros: filtrosValidos[] = ['todos', 'completados', 'pendientes'];

  pendientes: number= 0;
  mapa= {'=0': 's', '=1': '', 'other':'s'};

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.select('filtro')
      .subscribe( filtro => this.filtroActual = filtro );
      this.store.subscribe(state => {
        this.filtroActual = state.filtro;
        this.pendientes = state.todos.filter( todo => !todo.completado).length;
      })
  }

  cambiarFiltro(filtro: filtrosValidos) {
    this.store.dispatch(setFiltro({filtro}));
  }

  borrarCompletados() {
    this.store.dispatch(borrarCompletados());
  }

}
