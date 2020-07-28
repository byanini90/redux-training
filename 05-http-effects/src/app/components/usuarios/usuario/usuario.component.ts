import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.raducers';
import { cargarUsuario } from 'src/app/store/actions';
import { UsuarioModel } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styles: [
  ]
})
export class UsuarioComponent implements OnInit {

  usuario: UsuarioModel;

  constructor(private router: ActivatedRoute, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.router.params.subscribe(({id}) => {
      this.store.dispatch(cargarUsuario({id}));
    });

    this.store.select('usuario').subscribe(({user, loading, error}) => this.usuario = user);
  }

}
