import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Users } from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private backendURL: string = "http://localhost:8080/usuarios/";
  formData = new FormData();

  constructor(private httpClient: HttpClient) { }

    //Methods
    findAllUsers(): Observable<Users[]>{
      const complemento = "consultarTodos"
      return this.httpClient.get<Users[]>(this.backendURL + complemento);
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
}
/*
/login/prueba@gmail.com/12345678
 private backendURL: string = "http://localhost:8080/pago/";
  formData = new FormData();
   
  constructor(
    //HttpClient para proporcionar métodos que reciben datos del backend
    private httpClient: HttpClient
    ) { }
 
  //Methods
  findAllUsers(): Observable<Pago[]>{
    const complemento = "consultarTodos"
    return this.httpClient.get<Pago[]>(this.backendURL + complemento);
  }

  findAllUsersId(id: number): Observable<Pago>{
    const complemento = "consultarTodosId/"
    return this.httpClient.get<Pago>(this.backendURL + complemento + id);
  }


  create(pago: Pago): Observable<Pago[]>{
    const complemento = "crearPago"
    return this.httpClient.post<Pago[]>(this.backendURL + complemento, pago);
  }
*/