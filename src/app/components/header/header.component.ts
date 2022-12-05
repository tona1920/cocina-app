import { Component, OnInit } from '@angular/core';
import { Carrito } from 'src/app/models/carrito';
import { Users } from 'src/app/models/users';
import { CarritoService } from 'src/app/service/carrito.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  usuario :Users;
  cantidad: number;
  cartItems:Carrito[];
  constructor(private storageService: StorageService, private carritoService: CarritoService) { }

  ngOnInit(): void {
    this.storageService.getUser().forEach(element => {
      this.usuario=element;
    });

    setInterval(() => {
      this.itemsCarrto(); 
      }, 100);

    setInterval(() => {
      this.itemsCarrito(); 
      }, 100);
  }
  
  logout(){
    this.storageService.clear();
    window.location.href = 'login';
  }
  

  itemsCarrto(){
    this.carritoService.CountUsersId(this.usuario.id).subscribe(data=>{
      this.cantidad = data;
    });
  }

  itemsCarrito(){
    this.carritoService.findAllUsersId(this.usuario.id).subscribe(data=> this.cartItems=data);
    console.log(this.cartItems.length);
  }
}
