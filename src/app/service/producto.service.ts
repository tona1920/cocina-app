import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';
import { ProductoDTO } from '../models/producto-dto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private backendURL: string = "http://localhost:8080/productos/";
  formData = new FormData();
  constructor(private httpClient: HttpClient) { }

  findAllProductos(): Observable<Producto[]>{
    const complemento = "consultarTodos/"
    return this.httpClient.get<Producto[]>(this.backendURL + complemento );
  }
  create(producto: ProductoDTO): Observable<ProductoDTO[]>{
    const complemento = "agruegarIngrediente"
    return this.httpClient.post<ProductoDTO[]>(this.backendURL + complemento, producto);
  }
}
