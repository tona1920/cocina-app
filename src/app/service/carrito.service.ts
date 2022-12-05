import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Carrito } from '../models/carrito';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private backendURL: string = "http://localhost:8080/carrito/";
  formData = new FormData();
  constructor(private httpClient: HttpClient) { }

  //Methods
  CountUsersId(id:number): Observable<number>{
    const complemento = "usuarioC/"
    return this.httpClient.get<number>(this.backendURL + complemento+id);
  }

  TotalUserId(id:number): Observable<number>{
    const complemento = "total/"
    return this.httpClient.get<number>(this.backendURL + complemento+id);
  }

  findAllUsersId(id: number): Observable<Carrito[]>{
    const complemento = "usuario/"
    return this.httpClient.get<Carrito[]>(this.backendURL + complemento + id);
  }

  deleteCarrito(id:number): Observable<string>{
    const complemento = "clean/"
    return this.httpClient.delete<string>(this.backendURL+complemento+id);
  }

}
/*
  deleteHero (hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  findAllUsersId(id: number): Observable<Users>{
    const complemento = "consultarTodosId/"
    return this.httpClient.get<Users>(this.backendURL + complemento + id);
  }


  create(usuario: Users): Observable<Users[]>{
    const complemento = "crearUsuario"
    return this.httpClient.post<Users[]>(this.backendURL + complemento, usuario);
  }

  login(correo: String, contrasena:String): Observable<Users[]>{
    const complemento = "login/"
    return this.httpClient.get<Users[]>(this.backendURL + complemento + correo + "/" + contrasena);
  }
*/