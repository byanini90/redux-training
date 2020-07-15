import { createReducer, on } from '@ngrx/store';
import * as actions from './contador.actions';
 
export const initialState = 0;
 
const _contadorReducer = createReducer(initialState,
  on(actions.incrementar, state => state + 1),
  on(actions.decrementar, state => state - 1),
  on(actions.multiplicar, (state, props) => state * props.numero),
  on(actions.dividir, (state, {numero}) => state / numero),
  on(actions.reset, state => initialState)
);
 
export function contadorReducer(state, action) {
  return _contadorReducer(state, action);
}