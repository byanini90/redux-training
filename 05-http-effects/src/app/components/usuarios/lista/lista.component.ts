import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Uusario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styles: [
  ]
})
export class ListaComponent implements OnInit {

  usuarios: Uusario[] = []

  constructor(private usuariosService: UsuarioService) { }

  ngOnInit(): void {
    this.usuariosService.getUser()
      .subscribe( data => {
        this.usuarios = data;
      });
  }

}
