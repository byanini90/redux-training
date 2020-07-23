import { createReducer, on } from '@ngrx/store';
import { setItems, unsetItems } from './ingreso-egreso.actions';
import { IngresoEgresoModel } from '../models/ingreso-egreso.model';
import { AppState } from '../app.reducer';

export interface State {
    items: IngresoEgresoModel[]; 
}

export interface AppStateWithIngreso extends AppState {
    ingresosEgresos: State;
}

export const initialState: State = {
   items: [],
}

const _ingresoEgresoReducer = createReducer(initialState,

    on(setItems, (state, props) => ({ ...state, items: [...props.items]})),
    on(unsetItems, (state) => ({...state, items: []}))

);

export function ingresoEgresoReducer(state, action) {
    return _ingresoEgresoReducer(state, action);
}