import { Injectable } from '@angular/core';
import { Carrito } from '../models/carrito';
import { Users } from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }
  existsUser(): boolean {
    return localStorage.getItem('user') != null;
  }

  setUser(usuario: Users[]): void {
    localStorage.setItem('user', JSON.stringify(usuario));
  }

  getUser(): Users[] {
    return JSON.parse(localStorage.getItem('user'));
  }

  clear(): void {
    localStorage.removeItem('user');
  }

  setCart(cart: Carrito[]): void {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  getCart(): Carrito[] {
    return JSON.parse(localStorage.getItem('cart'));
  }

  clearCart(): void {
    localStorage.removeItem('cart');
  }
}
