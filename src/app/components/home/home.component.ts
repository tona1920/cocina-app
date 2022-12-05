import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Producto } from 'src/app/models/producto';
import { ProductoDTO } from 'src/app/models/producto-dto';
import { Users } from 'src/app/models/users';
import { ProductoService } from 'src/app/service/producto.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  itemsProductos:Producto[];
  itemProducto:Producto[];
  @ViewChild('closebutton') closebutton;
  form: FormGroup;
  producto:ProductoDTO;
  user:Users;
  countries: Array<any> = [
    { name: 'Opcion1', value: 1 },
    { name: 'Opcion2', value: 2 },
    { name: 'Opcion3', value: 3 },
  ];
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
  productosBase(){
    this.productoService.findAllProductos().subscribe(data=>this.itemsProductos=data);
  }

  detalleProducto(id:number){
    this.itemProducto = this.itemsProductos.filter((item) => item.nombre !== 'react');
    this.itemProducto = this.itemsProductos.filter(h => h.id == id);
    if(this.itemProducto.length>0){
      setTimeout(()=>{
        this.closebutton.nativeElement.click(),3000
      })
    }
  }

  onCheckboxChange(event: any) {
    
    const selectedCountries = (this.form.controls['selectedCountries'] as FormArray);
    if (event.target.checked) {
      selectedCountries.push(new FormControl(event.target.value));
    } else {
      const index = selectedCountries.controls
      .findIndex(x => x.value === event.target.value);
      selectedCountries.removeAt(index);
    }
  }

  submit() {
    console.log(this.form.value);
  }

  crearCarrito(){
  this.itemProducto.forEach(data=>{
    this.producto= new ProductoDTO(data.id,data.nombre,data.descripcion,data.precio,data.imagen,this.user.id,1,0,0,);
    this.productoService.create(this.producto).subscribe({
      next: (response) => {
        console.log('la petición fue exitosa')
      }, 
      error: () =>{
        console.log('ocurrió un error al hacer la petición')
      }
    });
  });
  }
/*
  this.cartItems.forEach(data=>{
    this.pago = new PagoDTO(data.nombre,data.imagen,data.descripcion,data.precio,data.cantidad,this.user.id,this.direccion,data.producto)
    this.pagoService.createPago(this.pago).subscribe(data=>{
      alert(JSON.stringify(data))
    });
  })
*/
}
