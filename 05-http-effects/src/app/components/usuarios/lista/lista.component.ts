import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.raducers';
import { cargarUsuarios } from 'src/app/store/actions';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styles: [
  ]
})
export class ListaComponent implements OnInit {

  usuarios: UsuarioModel[] = [];
  loading: boolean = false;
  error: any;

  constructor(private usuariosService: UsuarioService, private store: Store<AppState>) { }

  ngOnInit(): void {
    // Usaremos effects en vez de servicios
    // this.usuariosService.getUser()
    //   .subscribe( data => {
    //     this.usuarios = data;
    //   });
    this.store.select('usuarios').subscribe(({users, loading, error}) => {
      this.usuarios = users;
      this.loading = loading;
      this.error = error;
    });
    this.store.dispatch(cargarUsuarios());
  }

}
