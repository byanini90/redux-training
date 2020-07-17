import { createReducer, on } from '@ngrx/store';
import { crear, toggle, editar, borrar, toogleAll, borrarCompletados } from './todo.actions';
import { Todo } from './models/todo.model';
 
export const initialState: Todo[] = [
  new Todo('Salvar al mundo'),
  new Todo('Vencer a Thanos'),
  new Todo('Robar escudo del Capitán Amércia'),
  new Todo('Comprar traje Ironman'),
];
 
const _todoReducer = createReducer(initialState,
  on(crear, (state, {texto}) => [...state, new Todo(texto)]),
  on(toggle, (state, {id}) => {
    return state.map((todo) => { 
      if (todo.id === id) {
        return {
          ...todo,
          completado: !todo.completado
        }
        //NgRx no permite mutar elementos todo.completado = !todo.completado;
      }
      return todo;
    });
  }),
  on(editar, (state, {id, texto}) => {
    return state.map((todo) => { 
      if (todo.id === id) {
        return {
          ...todo,
          texto: texto
        }
        //NgRx no permite mutar elementos todo.completado = !todo.completado;
      }
      return todo;
    });
  }),
  on(borrar, (state, {id}) => state.filter((todo) => todo.id !== id)),
  on(toogleAll, (state, {completado}) => {
    return state.map((todo) => { 
        return {
          ...todo,
          completado: completado
        };
    })
  }),
  on(borrarCompletados, (state) => state.filter((todo) => !todo.completado)),
);
 
export function todoReducer(state, action) {
  return _todoReducer(state, action);
}