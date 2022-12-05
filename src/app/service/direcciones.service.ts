import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Direcciones } from '../models/direcciones';

@Injectable({
  providedIn: 'root'
})
export class DireccionesService {
  private backendURL: string = "http://localhost:8080/usuarioDirecciones/";
  private backendCPURL: string = "https://apis.forcsec.com/api/codigos-postales/20221124-2fe6f58a5d9d5eb5/";
  formData = new FormData();

  constructor(private httpClient: HttpClient) { }

  findDireccionCP(cp: number): Observable<any[]>{
    return this.httpClient.get<any[]>(this.backendCPURL + cp);
  }

  findAllUsersId(id: number): Observable<Direcciones[]>{
    const complemento = "direccion/"
    return this.httpClient.get<Direcciones[]>(this.backendURL + complemento + id);
  }
}

