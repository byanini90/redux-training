import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgresoModel } from 'src/app/models/ingreso-egreso.model';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from 'src/app/services/ingreso-egreso.service';
import { isLoading, stopLoading } from 'src/app/shared/ui.actions';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: [
  ]
})
export class DetalleComponent implements OnInit, OnDestroy {

  ingresosEgresos: IngresoEgresoModel[] = []
  ingresosSubscription: Subscription;

  constructor(private store: Store<AppState>, private ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit(): void {
    this.ingresosSubscription = this.store.select('ingresosEgresos')
      .subscribe(ingresosEgresos => {
        this.ingresosEgresos = ingresosEgresos.items;
      });
  }

  ngOnDestroy() {
    this.ingresosSubscription.unsubscribe();
  }

  borrar(uid: string) {
    this.store.dispatch(isLoading());
    this.ingresoEgresoService.borrarIngresoEgreso(uid)
      .then(() => {
        Swal.fire('Registro creado', 'Item borrado', 'success');
      })
      .catch(error =>  Swal.fire('Error', error.message, 'error'))
      .finally(() => this.store.dispatch(stopLoading()));
  }

}
