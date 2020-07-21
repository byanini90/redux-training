import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { isLoading, stopLoading } from 'src/app/shared/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  cargando: boolean;
  uiSubscription: Subscription;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.uiSubscription = this.store.select('ui').subscribe(ui => {
      this.cargando = ui.isLoading;
    });
  }

  ngOnDestroy() {
    this.uiSubscription.unsubscribe();
  }

  login() {
    if (this.loginForm.invalid) {
      return;
    }
    this.store.dispatch(isLoading());
    // Swal.fire({
    //   title: 'Loading...',
    //   onBeforeOpen: () => {
    //     Swal.showLoading();
    //   }
    // });

    const {correo, password} = this.loginForm.value;
    this.authService.loginUsuario(correo, password)
      .then(({user}) => {        
        this.router.navigate(['/']);
      })
      .catch(error => {        
        // Swal.fire({
        //   icon: 'error',
        //   title: 'Oops...',
        //   text: error.message,
        // });
      })
      .finally( () => {
        // Swal.close();
        this.store.dispatch(stopLoading());
      });;
  }

}
