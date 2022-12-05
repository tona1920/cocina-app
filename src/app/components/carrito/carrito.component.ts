import { getHtmlTagDefinition } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
import { Carrito } from 'src/app/models/carrito';
import { Direcciones } from 'src/app/models/direcciones';
import { Pago } from 'src/app/models/pago';
import { PagoDTO } from 'src/app/models/pago-dto';
import { Producto } from 'src/app/models/producto';
import { Users } from 'src/app/models/users';
import { CarritoService } from 'src/app/service/carrito.service';
import { DireccionesService } from 'src/app/service/direcciones.service';
import { PagoService } from 'src/app/service/pago.service';
import { StorageService } from 'src/app/service/storage.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})

export class CarritoComponent implements OnInit {

  sucursales = [{"id": '1', "Direccion": "minivan", "nombre": "Sucursal 1",},{"id": '2',"Direccion": "minivan","nombre": "Sucursal 2",}];
  cartItems:Carrito[];
  user:Users;
  cantidad: number=0;
  labelPosition: 1 | 2 | 0 = 0;
  opcionSeleccionado: string  = '0';
  direcciones:Direcciones[];
  direccion:number=0;
  total:number=0;
  submitted = false;
  pago:PagoDTO;

  
  firstFormGroup = this._formBuilder.group({
    estado: ['', Validators.required],
    municipio: ['', Validators.required],
    calle: ['', Validators.required],
    colonia: ['', Validators.required],
  });

  oppoSuitsForm = this._formBuilder.group({
    name: ['']
  });
  public payPalConfig?: IPayPalConfig;
  @ViewChild('closebutton') closebutton;

  constructor(
    private carritoService:CarritoService, 
    private storageService:StorageService,
    private _formBuilder: FormBuilder,
    private direccionesSercive: DireccionesService,
    private pagoService: PagoService
  ) { }

  ngOnInit(): void {
    this.getUsuario();
    this.itemsCount();
    this.itemsCarrito();
  }


  itemsCarrito(){
    this.carritoService.findAllUsersId(this.user.id).subscribe(data=> this.cartItems=data);
    console.log(this.cartItems.length);
    this.initConfig();
  }

  getInit(){
    this.initConfig();
    this.getUsuarioDireccion();
  }

  getUsuario(){
    this.storageService.getUser().forEach(element => {
      this.user=element;
    });
  }

  itemsCount(){
    this.carritoService.CountUsersId(this.user.id).subscribe(data=>{
      this.cantidad = data;
    });
    this.carritoService.TotalUserId(this.user.id).subscribe(data=>{
      this.total=data;
    });
  }

  domicilio(event: Event): any {
    event.preventDefault();
    if (this.firstFormGroup.valid) {
      const value = this.firstFormGroup.value;
      this.closebutton.nativeElement.click();
    }
  }

  getUsuarioDireccion(){
    this.direccionesSercive.findAllUsersId(this.user.id).subscribe(data=>this.direcciones=data);
  }

  capturarDireccion(){
    const value=this.oppoSuitsForm.value
    this.direccion= Number(value.name);
    alert(this.direccion);
  }

  getItemsList(): any[] {
    const items: any[] = [];
    let item = {};
    this.cartItems.forEach((it:Carrito) => {
      item = {
        name: it.nombre,
        quantity: it.cantidad,
        unit_amount: {value: it.precio, currency_code: 'MXN'}
      };
      items.push(item);
    });
    return items;
  }
  
  getTotal(): number {
    let total = 0;
    this.cartItems.forEach(item => {
      total += item.cantidad * item.precio;
    });
    return +total.toFixed(2);
  }

  eliminarItem(id:number){
    this.cartItems = this.cartItems.filter(h => h.id != id);
    this.carritoService.deleteCarrito(id).subscribe(data=>{
      if(data.length>1){
        console.log(data);
      }
    }); 
  }
  crearPago(){
    this.cartItems.forEach(data=>{
      
      this.pago = new PagoDTO(data.nombre,data.imagen,data.descripcion,data.precio,data.cantidad,this.user.id,this.direccion,data.producto)
      this.pagoService.createPago(this.pago).subscribe(data=>{
        alert(JSON.stringify(data))
      });
    })
  }

  private initConfig(): void {
    this.payPalConfig = {
      currency: 'MXN',
      clientId: environment.clientId,
      // tslint:disable-next-line: no-angle-bracket-type-assertion
      createOrderOnClient: (data) => <ICreateOrderRequest> {
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: 'MXN',
            value: this.getTotal().toString(),
            breakdown: {
              item_total: {
                currency_code: 'MXN',
                value: this.getTotal().toString()
              }
            }
          },
          items: this.getItemsList()
        }]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        //this.spinner.show();
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then(details => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
        });

      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point',
        JSON.stringify(data));
        this.crearPago();
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions,JSON.stringify(data));
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Pago cancelado',
          showConfirmButton: false,
          timer: 50000
        })
      },
      onError: err => {
        console.log('OnError', err);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions,JSON.stringify(data));
      },
    };
  }

}
