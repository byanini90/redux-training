import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from '../app.reducer';
import { stopLoading, isLoading } from '../shared/ui.actions';
import { IngresoEgresoModel } from '../models/ingreso-egreso.model';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: [
  ]
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  ingresoForm: FormGroup;
  tipo: string = 'ingreso';
  cargando: boolean = false;
  cargandoSubscription: Subscription;

  constructor(private fb: FormBuilder, private ingresoEgreso: IngresoEgresoService, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.ingresoForm = this.fb.group({
      descripcion: ['', Validators.required],
      monto: ['', Validators.required]
    });

    this.cargandoSubscription = this.store.select('ui')
      .subscribe(uiState => {
        this.cargando = uiState.isLoading;
      });
  }

  ngOnDestroy() {
    this.cargandoSubscription.unsubscribe();
  }

  guardar() {    
    if (this.ingresoForm.invalid) {
      return;
    }
    this.store.dispatch(isLoading());
    const {descripcion, monto} = this.ingresoForm.value;
    const ingresoEgreso = new IngresoEgresoModel(descripcion, monto, this.tipo);
    this.ingresoEgreso.crearIngresoEgreso(ingresoEgreso)
      .then((ref) => {
        Swal.fire('Registro creado', descripcion, 'success');
        this.ingresoForm.reset();
      })
      .catch((error) => {
        Swal.fire('Error', error.message, 'error');
      })
      .finally(() => this.store.dispatch(stopLoading()));
  }

}
