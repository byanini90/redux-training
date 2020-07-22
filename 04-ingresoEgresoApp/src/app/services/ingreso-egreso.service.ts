import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IngresoEgresoModel } from '../models/ingreso-egreso.model';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  constructor(private firestore: AngularFirestore, private auth: AuthService) { }

  crearIngresoEgreso(ingresoEgresoModel: IngresoEgresoModel) {
    delete ingresoEgresoModel.uid;
    return this.firestore.doc(`${this.auth.user.uid}/ingresos-egresos`)
      .collection('items')
      .add({...ingresoEgresoModel});
  }

  initIngresosEgresosListener(uid: string) {
    return this.firestore.collection(`${uid}/ingresos-egresos/items`)
      .snapshotChanges()
      .pipe(
        map(snapShot => snapShot.map(doc => ({  
              uid: doc.payload.doc.id,
              ...<IngresoEgresoModel>doc.payload.doc.data()
            })
          )
        )
      );
  }

  borrarIngresoEgreso(uid: string) {
    return this.firestore.doc(`${this.auth.user.uid}/ingresos-egresos/items/${uid}`)
      .delete();
  }
}
