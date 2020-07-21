import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { setUser, unsetUser } from '../auth/auth.actions';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

	userSubscription: Subscription;

	constructor(private angularFireAuth: AngularFireAuth, public firestore: AngularFirestore, private store: Store<AppState>) { }

	initAuthListener() {
		this.angularFireAuth.authState.subscribe(user => {
			if (user) {
				this.userSubscription = this.firestore.doc(`${user.uid}/usuario`).valueChanges()
					.subscribe((firestoreUser: Usuario) => {
						const tempUser = Usuario.fromFirebase(firestoreUser);
						this.store.dispatch(setUser({user: tempUser}));
					});
			} else {
				this.userSubscription.unsubscribe();
				this.store.dispatch(unsetUser());
			}
		});
	}

	crearUsuario(nombre: string, correo: string, password: string) {
		return this.angularFireAuth.createUserWithEmailAndPassword(correo, password).then( ({user}) => {
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
