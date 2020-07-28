import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url: string = 'https://reqres.in/api';

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get(`${this.url}/users?page=2&delay=3`)
      .pipe(
        map( resp => {
          return resp['data'];
        })
      )
  }

  getUserById(id: number) {
    console.log(id);
    return this.http.get(`${this.url}/users/${id}`)
      .pipe(
        map( resp => {
          return resp['data'];
        })
      )
  }
}
