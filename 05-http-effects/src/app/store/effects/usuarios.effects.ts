import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as usuariosActions from '../actions';
import { tap, mergeMap, map, catchError } from 'rxjs/operators';
import { UsuarioService } from 'src/app/services/usuario.service';
import { of } from 'rxjs';


@Injectable()
export class UsuariosEffects {

    constructor(private actions$: Actions, private usuariosService: UsuarioService) {}

    cargarUsuarios$ = createEffect(
        () => this.actions$.pipe(
            ofType(usuariosActions.cargarUsuarios),
            tap(data => console.log('effect tap', data)),
            mergeMap(
                () => this.usuariosService.getUsers().pipe(
                    tap(data => console.log('getUsers effect', data)),
                    map(usuarios => usuariosActions.cargarUsuariosSuccess({usuarios})),
                    catchError(error => of(usuariosActions.cargarUsuariosError({payload: error})))
                )
            )
        )
    )
}