import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';
import { Producto } from 'src/app/models/producto';
import { ProductoDTO } from 'src/app/models/producto-dto';
import { Users } from 'src/app/models/users';
import { ProductoService } from 'src/app/service/producto.service';
import { StorageService } from 'src/app/service/storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  itemsProductos:Producto[];
  itemProducto:Producto[];
  @ViewChild('closebutton') closebutton;
  @ViewChild('closebutton1') closebutton1;
  @ViewChild('closebuttonModal') closebuttonModal;
  @ViewChild('closebuttonModal1') closebuttonModal1;
  form: FormGroup;
  producto:ProductoDTO;
  user:Users;
  opcion1:number=0;
  opcion2:number=0;
  opcion3:number=0;
  textoDeInput: string = null


  constructor(private storageService:StorageService, private productoService:ProductoService,private fb: FormBuilder) { }

  ngOnInit(): void {
    if(this.storageService.existsUser()){
      this.getUsuario();
      this.productosBase();
      this.form = this.fb.group({
        selectedCountries:  new FormArray([])
       });
    }
  }
  getUsuario(){
    this.storageService.getUser().forEach(element => {
      this.user=element;
    });
  }
  setOpcion1(){
    if(this.opcion1==0){
      this.opcion1=1;
    }else{
      this.opcion1=0;
    }
  }
  setOpcion2(){
    if(this.opcion2==0){
      this.opcion2=2;
    }else{
      this.opcion2=0;
    }
  }
  setOpcion3(){
    if(this.opcion3==0){
      this.opcion3=3;
    }else{
      this.opcion3=0;
    }
  }
  productosBase(){
    this.productoService.findAllProductos().subscribe(data=>this.itemsProductos=data);
  }

  detalleProducto(id:number){
    this.opcion1=0;
    this.opcion2=0;
    this.opcion3=0;
    this.itemProducto = this.itemsProductos.filter((item) => item.nombre !== 'react');
    this.itemProducto = this.itemsProductos.filter(h => h.id == id);
    if(this.itemProducto.length>0){
      setTimeout(()=>{
        this.closebutton.nativeElement.click(),3000
      })
    }
  }
  detalleProducto1(id:number){
    this.itemProducto = this.itemsProductos.filter((item) => item.nombre !== 'react');
    this.itemProducto = this.itemsProductos.filter(h => h.id == id);
    if(this.itemProducto.length>0){
      setTimeout(()=>{
        this.closebutton1.nativeElement.click(),3000
      })
    }
  }


  crearCarrito(c:number){
    if(c>0 && c<20){
      this.itemProducto.forEach(data=>{
        this.producto= new ProductoDTO(data.id,data.nombre,data.descripcion,data.precio,data.imagen,this.user.id,this.opcion1,this.opcion2,this.opcion3,c);
        this.productoService.create(this.producto).subscribe({
          next: (response) => {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Se ha agregado a tu carrito',
              showConfirmButton: false,
              timer: 1500
            })
          }, 
          error: () =>{
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Error al agregar al carrito',
              showConfirmButton: false,
              timer: 1500
            })
          }
        });
      });
      setTimeout(()=>{
        this.closebuttonModal.nativeElement.click(),5000
      });
      
    }else{
      Swal.fire('Cantidad no valida');
    }
  }
  crearCarrito2(c:number){
    if(c>0 && c<20){
      this.itemProducto.forEach(data=>{
        this.producto= new ProductoDTO(data.id,data.nombre,data.descripcion,data.precio,data.imagen,this.user.id,0,0,0,c);
        this.productoService.create(this.producto).subscribe({
          next: (response) => {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Se ha agregado a tu carrito',
              showConfirmButton: false,
              timer: 1500
            })
          }, 
          error: () =>{
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Error al agregar al carrito',
              showConfirmButton: false,
              timer: 1500
            })
          }
        });
      });
      setTimeout(()=>{
        this.closebuttonModal1.nativeElement.click(),5000
      });
      
    }else{
      Swal.fire('Cantidad no valida');
    }
  }
}
