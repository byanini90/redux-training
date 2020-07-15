// Acciones
export interface Action {
    type: string;
    payload?: any;
}

// Reducer
export  interface Reducer<T> {
    (state: T, action: Action): T;
}