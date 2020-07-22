import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit, OnDestroy {

  nombre: string;
  userSubscription: Subscription;

  constructor(private authService: AuthService, private router: Router, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.userSubscription = this.store.select('user')
      .subscribe(({user}) => {
        if (user !== null) {
          this.nombre = user.nombre;
        }
      })
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  logout() {    
    this.authService.logout()
      .then(() => this.router.navigate(['/login']));
  }
}
