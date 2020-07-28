import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as usuariosActions from '../actions';
import { tap, mergeMap, map, catchError } from 'rxjs/operators';
import { UsuarioService } from 'src/app/services/usuario.service';
import { of } from 'rxjs';


@Injectable()
export class UsuarioEffects {

    constructor(private actions$: Actions, private usuariosService: UsuarioService) {}

    cargarUsuario$ = createEffect(
        () => this.actions$.pipe(
            ofType(usuariosActions.cargarUsuario),
            tap(data => console.log('effect tap', data)),
            mergeMap(
                (action) => this.usuariosService.getUserById(action.id).pipe(
                    tap(data => console.log('getUsers effect', data)),
                    map(usuario => usuariosActions.cargarUsuarioSuccess({usuario})),
                    catchError(error => of(usuariosActions.cargarUsuarioError({payload: error})))
                )
            )
        )
    );
}