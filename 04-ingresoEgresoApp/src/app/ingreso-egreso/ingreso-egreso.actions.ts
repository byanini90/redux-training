import { createAction, props } from '@ngrx/store';
import { IngresoEgresoModel } from '../models/ingreso-egreso.model';

export const setItems = createAction('[IngresoEgreso Component] Set Item', props<{items: IngresoEgresoModel[]}>());
export const unsetItems = createAction('[IngresoEgreso Component] Unset Item');