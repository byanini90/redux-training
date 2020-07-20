import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

	constructor(private angularFireAuth: AngularFireAuth, public firestore: AngularFirestore) { }

	initAuthListener() {
		this.angularFireAuth.authState.subscribe(user => {
			console.log(user);
		});
	}

	crearUsuario(nombre: string, correo: string, password: string) {
		return this.angularFireAuth.createUserWithEmailAndPassword(correo, password).then( ({user}) => {
			console.log(user);
			const {uid, email} = user;
			const newUser: Usuario = new Usuario(uid, nombre, email);
			return this.firestore.doc(`${uid}/usuario`).set({...newUser});
		});
	}

	loginUsuario(correo: string, password: string) {
		return this.angularFireAuth.signInWithEmailAndPassword(correo, password);
	}

	logout() {
		return this.angularFireAuth.signOut();
	}

	isAuth() {
		return this.angularFireAuth.authState.pipe(
			map(user => user != null)
		);
	}
}
