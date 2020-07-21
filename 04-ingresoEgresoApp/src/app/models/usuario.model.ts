export class Usuario {

    static fromFirebase({nombre, uid, correo}) {
        return new Usuario(uid, nombre, correo);
    }
    
    constructor(
        public uid: string,
        public nombre: string,
        public correo: string
    ) {}
}