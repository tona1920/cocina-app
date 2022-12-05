import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pago } from '../models/pago';
import { PagoDTO } from '../models/pago-dto';

@Injectable({
  providedIn: 'root'
})
export class PagoService {
  private backendURL: string = "http://localhost:8080/pago/";
  formData = new FormData();

  constructor(private httpClient: HttpClient) { }

  findAllUsersId(id: number): Observable<Pago[]>{
    const complemento = "pago/"
    return this.httpClient.get<Pago[]>(this.backendURL + complemento + id);
  }
  createPago(pago: PagoDTO): Observable<PagoDTO[]>{
    const complemento = "crearPago"
    return this.httpClient.post<PagoDTO[]>(this.backendURL + complemento, pago);
  }
}
