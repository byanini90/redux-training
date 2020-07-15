import { Action } from "./ngrx-fake/ngrx";
import * as contadorActions from "./contador/contador.actions";

function reducer(state = 10, action: Action) {
    switch (action.type) {
        case 'INCREMENTAR':
            return state += 1;
        case 'DECREMENTAR':
            return state -= 1;
        case 'MULTIPLICAR':
            return state *= action.payload;
        case 'DIVIDIR':
            return state /= action.payload;
        case 'RESET':
            return state = 0;
        default:
            return state;
    }
}

console.log(reducer(10, contadorActions.incrementadorAction));
console.log(reducer(10, contadorActions.decrementadorAction));
console.log(reducer(10, contadorActions.multiplicadorAction));
console.log(reducer(10, contadorActions.dividirAction));
console.log(reducer(10, contadorActions.resetAction));